from django.contrib import admin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.admin import UserAdmin
from django import forms 

from practices.models import Practice, DailySummary, User, Entity, Provider, Specialty
# Register your models here.

class EntityAdmin(admin.ModelAdmin):
	fields=('name',)
	list_display=('name', 'slug')

class PracticeAdmin(admin.ModelAdmin):
	fields =('name', 'entity')
	list_display = ('name', 'slug', 'entity')


class DailySummaryAdmin(admin.ModelAdmin):
	exclude = ('entity',)

class ProviderAdmin(admin.ModelAdmin):
	fields = ('first_name', 'last_name',
		'credentials', 'entity', 'practices', 'specialties', 'alias_1', 'alias_2')

class SpecialtyAdmin(admin.ModelAdmin):
	fields = ('name',)

class CreateUserForm(forms.ModelForm):
	password1 = forms.CharField(
		label="Password", 
		widget=forms.PasswordInput,
		required=True)
	password2 = forms.CharField(
		label="Confirm password", 
		widget=forms.PasswordInput,
		required=True)
	
	class Meta:
		model= User
		fields = ('first_name', 'last_name', 'user_type', 'practice', 'entity', 'email')
	
	def clean_password2(self):
		password1 = self.cleaned_data.get("password1")
		password2 = self.cleaned_data.get("password2")
		if password1 and password2 and password1 != password2:
			raise forms.ValidationError("Passwords don't match")
		return password2 

	def save(self, commit=True):
		user = super().save(commit=False)
		user.set_password(self.cleaned_data["password1"])
		if commit:
			user.save()
		return user


class UpdateUserForm(forms.ModelForm):
	password = ReadOnlyPasswordHashField()

	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'user_type', 'practice', 'entity', 'email', 'is_active', 'password')

	def clean_password(self):
		return self.initial.get("password")

class CustomUserAdmin(UserAdmin):
	add_form = CreateUserForm
	form = UpdateUserForm

	list_display = ('first_name', 'last_name', 'practice',
		'user_type', 'email', 'is_active')
	fieldsets = (
		(None, {'fields': ('email',)}),
		('Personal info', {'fields': ('first_name', 'last_name')}),
		('User setup', {'fields': ('practice', 'entity', 'groups', 'user_type')})
		)

	add_fieldsets = (
		(None, {
			'fields': ('first_name', 'last_name', 'practice', 'entity', 'user_type', 'groups', 'email', 'password1', 'password2'),
			}),
		)

	ordering = ('practice', 'last_name')
	

admin.site.register(Practice, PracticeAdmin)
admin.site.register(DailySummary, DailySummaryAdmin)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Provider, ProviderAdmin)
admin.site.register(Entity, EntityAdmin)
admin.site.register(Specialty, SpecialtyAdmin)