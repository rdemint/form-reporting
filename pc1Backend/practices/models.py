import decimal
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils.text import slugify

# Create your models here.
class Entity(models.Model):
	name = models.CharField(max_length=200)
	slug = models.SlugField(unique=True)
	# specialties = models.ManyToManyRel(to=Specialty, through='DailySummary', related_name='specialties')

	@property
	def specialties(self):
		qs = Specialty.objects.filter(providers__entity=self).all()
		return list(qs)
	
	def save(self, *args, **kwargs):
		self.slug=slugify(self.name)
		super().save(*args, **kwargs)

	def __str__(self):
		return  self.name

	class Meta:	
		ordering=['name']


class Practice(models.Model):
	name = models.CharField(max_length=200)
	slug = models.SlugField(unique=True)
	entity = models.ForeignKey(to=Entity, on_delete=models.CASCADE, default=None, null=True, related_name='practices')

	def save(self, *args, **kwargs):
		if self.entity == "None" or self.entity=="":
			self.entity = None
		self.slug=slugify(self.name)
		super().save(*args, **kwargs)

	#https://stackoverflow.com/questions/28163556/how-do-you-filter-a-nested-serializer-in-django-rest-framework
	def daily_summaries_by_month(self):
		return DailySummary.objects.filter(practice=self, date__year=self.request.GET('year', None), date__month=self.request.GET('month', None))

	def __str__(self):
		return self.name

	class Meta:
		ordering=['name']


class UserManager(BaseUserManager):

	def create_user(self, email, password=None, **kwargs):
		user = self.model(email=self.normalize_email(email), **kwargs)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, password):
		superuser = self.create_user(email, password)
		superuser.is_staff = True
		superuser.is_superuser = True
		superuser.save(using=self._db)
		return superuser


class User(AbstractBaseUser, PermissionsMixin):
	TYPE_CHOICES = (
	('doctor', 'Doctor'),
	('staff', 'Staff'),
	('manager', 'Manager'),
	('admin', 'Admin'))
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	user_type = models.CharField(choices=TYPE_CHOICES, max_length=100)
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE,
		related_name='users', null=True, default=None, blank=True)
	entity = models.ForeignKey(Entity, on_delete=models.CASCADE, 
		related_name='entities', null=True)
	email = models.EmailField(max_length=255, unique=True)
	#the following two are required for custom user models 
	#as stated by the django docs
	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)

	objects=UserManager()
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	
	def __str__(self):
		return self.first_name + " " + self.last_name


class Specialty(models.Model):
	name = models.CharField(max_length=150, unique=True)
	slug = models.SlugField(null=False)

	def save(self, *args, **kwargs):
		self.slug = slugify(self.name)
		super().save(*args, **kwargs)

	def __str__(self):
		return self.name

	class Meta: 
		ordering=['name']

class Provider(models.Model):
	first_name = models.CharField(max_length=256)
	last_name = models.CharField(max_length=256)
	slug = models.SlugField(default=None, null=True, max_length=256)
	credentials = models.CharField(null=True, max_length=256)
	alias_1 = models.CharField(null=True, blank=True, max_length=256)
	alias_2 = models.CharField(null=True, blank=True, max_length=256)
	practices = models.ManyToManyField(Practice, related_name="providers")
	entity = models.ForeignKey(
		Entity, 
		on_delete=models.CASCADE, 
		related_name="providers")
	specialties = models.ManyToManyField(Specialty, related_name='providers')
	visits_goal = models.IntegerField(default=20)

	def __str__(self):
		return "{} {}, {}".format(self.first_name, self.last_name, self.credentials)

	@property 
	def name(self):
		return "{}, {} {}".format(self.last_name, self.first_name, self.credentials)

	def save(self, *args, **kwargs):
		self.slug = slugify(self.first_name + ' ' + self.last_name)
		super().save(*args, **kwargs)

	class Meta:
		unique_together = ('first_name', 'last_name', 'entity')
		ordering=['last_name']

# class DailySummaryManager(models.Manager):

# 	def get_queryset(self, year, month): 
# 		return super().get_queryset().filter(date__month=self.request.kwargs['month'], date__year=self.request.kwargs['year'])
#very interesting but I do not need this now


class DailySummary(models.Model):
	'''submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)'''
	'''provider = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="daily_summaries") '''
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE, related_name="daily_summaries")
	entity = models.ForeignKey(Entity, null=True, default=None, on_delete=models.CASCADE, related_name="daily_summaries")
	specialty = models.ForeignKey(Specialty, null=True, on_delete=models.CASCADE, related_name="daily_summaries")
	date = models.DateField(null=True)
	last_updated = models.DateTimeField(auto_now_add=True)
	visits = models.IntegerField(null=False)
	workdays = models.IntegerField(null=False)
	noshows = models.IntegerField(null=True)
	provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name="daily_summaries")
	

	objects = models.Manager()

	class Meta:
		unique_together = (('date', 'provider'))
		ordering=['-date']

	@property
	def visits_per_workdays(self):
		return round(decimal.Decimal(self.visits/self.workdays), 1)
	
	def save(self, *args, **kwargs):
		entity = self.practice.entity
		if self.specialty in self.provider.specialties.all():
			super().save(*args, **kwargs)
		else:
			print('That specialty is not associated with that provider. Please add it before trying again.')
			raise Exception

	def __str__(self):
		return self.practice.__str__() + ': Daily for ' + self.date.strftime('%A') +', ' + self.date.strftime('%m/%d/%Y')



