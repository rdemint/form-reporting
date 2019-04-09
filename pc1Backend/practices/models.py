from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils.text import slugify

# Create your models here.
class Practice(models.Model):
	name = models.CharField(max_length=200)
	slug = models.SlugField(unique=True)

	def save(self, *args, **kwargs):
		self.slug=slugify(self.name)
		super().save(*args, **kwargs)

	def __str__(self):
		return self.name 


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
	('Doctor', 'doctor'),
	('Staff', 'staff'),
	('Admin', 'admin'))
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	user_type = models.CharField(choices=TYPE_CHOICES, max_length=100)
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE,
		related_name='users', null=True)
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

class DailySummary(models.Model):
	'''submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)'''
	'''provider = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="daily_summaries") '''
	practice = models.ForeignKey(Practice, on_delete=models.CASCADE, related_name="daily_summaries")
	date = models.DateField(null=True)
	last_updated = models.DateTimeField(auto_now_add=True)
	visits = models.IntegerField(null=False)
	workdays = models.IntegerField(null=False)
	noshows = models.IntegerField(null=True)

	class Meta:
		unique_together = (('practice'),('date'))

	def __str__(self):
		return self.practice.__str__() + ': Daily for ' + self.date.strftime('%A') +', ' + self.date.strftime('%m/%d/%Y')


