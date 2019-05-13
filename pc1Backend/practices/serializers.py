
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from practices.models import Practice, DailySummary, User, Entity, Provider
from django.contrib.auth import get_user_model, authenticate

class DailySummariesByMonthListSerializer(serializers.ListSerializer):
	def to_representation(self, data):
		print(self.context['request'].query_params)

		if self.context['request'].query_params.get('entity'):
			entity_param = self.context['request'].query_params.get('entity')
			data.filter(entity__slug = entity_param)

		if self.context['request'].query_params.get('practice'):
			practice_param = self.context['request'].query_params.get('practice')
			print(practice_param)
			data.filter(practice__slug = practice_param)

		if self.context['request'].query_params.get('year') and self.context['request'].query_params.get('month'):
			data = data.filter(date__year=self.context['request'].query_params.get('year'), date__month=self.context['request'].query_params.get('month'))
			return super().to_representation(data)
		else: 
			return super().to_representation(data)


class DailySummariesByMonthSerializer(serializers.ModelSerializer):
	provider = serializers.SlugRelatedField(slug_field='full_name', many=False, read_only=True)
	practice = serializers.SlugRelatedField(slug_field="slug", many = False, read_only=True)

	class Meta:
		list_serializer_class = DailySummariesByMonthListSerializer
		model = DailySummary
		fields = ('date', 'workdays', 'visits', 'noshows', 'visits_per_workdays', 'provider', 'practice')

		
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
	# full_name = serializers.SerializerMethodField()

	# def get_full_name(self, provider):
	# 	return "{}, {} {}".format(provider.last_name, provider.first_name, provider.credentials) 

	class Meta:
		model = Provider	
		fields = ('id', 'full_name', 'first_name', 'last_name', 'credentials')


class PracticeSummariesSerializer(serializers.ModelSerializer):
	#providers = serializers.SlugRelatedField(slug_field='full_name', many=True, read_only=True)
	daily_summaries = DailySummariesByMonthSerializer(many=True, read_only=True)
	providers = ProviderSerializer(many=True, read_only=True)


	class Meta:
		model = Practice 
		fields = ('id', 'name', 'slug', 'providers', 'daily_summaries')

class ProviderSummariesSerializer(serializers.ModelSerializer):
	daily_summaries = DailySummariesByMonthSerializer(many=True, read_only=True)
	practices = serializers.SlugRelatedField(slug_field='name', many=True, read_only=True)

	class Meta:
		model = Provider 
		fields = ('id', 'first_name', 'last_name', 'full_name', 'daily_summaries', 'practices')


class EntitySerializer(serializers.ModelSerializer):

	class Meta:
		model = Entity
		fields = ('name', 'slug')


class EntityPracticesSerializer(serializers.ModelSerializer):
	practices = PracticeSummariesSerializer(many=True, read_only=True)

	class Meta:
		model = Entity 
		fields = ('name', 'slug', 'practices')

class EntityProvidersSerializer(serializers.ModelSerializer):
	providers = ProviderSummariesSerializer(many=True, read_only=True)

	class Meta:
		model = Entity 
		fields = ('name', 'slug', 'providers')


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

