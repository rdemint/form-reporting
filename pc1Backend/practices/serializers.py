
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from practices.models import Practice, DailySummary, User, Entity, Provider, Specialty
from django.contrib.auth import get_user_model, authenticate


class SpecialtySerializer(serializers.ModelSerializer):

	class Meta:
		model = Specialty 
		fields = ('name', 'slug')
	
class DailySummarySerializer(serializers.ModelSerializer):
	practice = serializers.StringRelatedField(many=False)
	provider = serializers.SlugRelatedField(slug_field='slug', many=False, read_only=True)

	visits_per_workdays = serializers.ReadOnlyField()

	class Meta:
		model = DailySummary
		fields = ('date', 'entity', 'practice', 'provider', 'visits', 'workdays', 'noshows', 'visits_per_workdays')
		validators=[UniqueTogetherValidator(
				queryset=DailySummary.objects.all(),
				fields=('practice', 'date'),
				message="A daily summary for this date already exists.  Choose a new date or edit the existing summary."
			)
		]

class ProviderSerializer(serializers.ModelSerializer):
	practices = serializers.SlugRelatedField(slug_field="name", read_only=True, many=True)
	specialties = serializers.StringRelatedField(many=True)

	class Meta:
		model = Provider	
		fields = ('id', 'full_name', 'first_name', 'last_name', 'credentials', 'practices')


class PracticeSerializer(serializers.ModelSerializer):
	providers = ProviderSerializer(read_only=True, many=True)
	specialties = SpecialtySerializer(read_only=True, many=True)

	class Meta:
		model = Practice 
		fields = ('id', 'name', 'slug', 'providers', 'specialties')


class EntitySerializer(serializers.ModelSerializer):
	practices = PracticeSerializer(many=True, read_only=True)
	providers = ProviderSerializer(many=True, read_only=True)
	specialties = SpecialtySerializer(many=True, read_only = True)

	class Meta:
		model = Entity
		fields = ('name', 'slug', 'providers', 'practices', 'specialties')


class AuthTokenSerializer(serializers.Serializer):
	email = serializers.CharField()
	password = serializers.CharField(
		style={'input_type': 'password'},
		trim_whitespace=False)

	def validate(self, attrs):
		email=attrs.get('email')
		password=attrs.get('password')
		user = authenticate(
			request=self.context.get('request'),
			username=email,
			password=password
			)
		if not user:
			msg = ('Unable to login with that email and password')
			raise serializers.ValidationError(msg, code='authentication')

		attrs['user'] = user
		return attrs


class UserSerializer(serializers.ModelSerializer):
	class Meta: 
		model = get_user_model()
		fields = ('username', 'email', 'password', 'practice', 'entity', 'groups')
		extra_kwargs = {'password': {'write_only': True, 'min_length':5}}

	def create(self, validated_data):
		return get_user_model().objects.create_user(**validated_data)

