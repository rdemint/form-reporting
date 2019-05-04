from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from practices.models import Practice, DailySummary, User, Entity, Provider
from django.contrib.auth import get_user_model, authenticate


class DailySummarySerializer(serializers.ModelSerializer):
	practice = serializers.StringRelatedField(many=False)
	provider = serializers.SlugRelatedField(slug_field='slug', many=False, read_only=True)

	class Meta:
		model = DailySummary
		fields = "__all__"
		validators=[UniqueTogetherValidator(
				queryset=DailySummary.objects.all(),
				fields=('practice', 'date'),
				message="A daily summary for this date already exists.  Choose a new date or edit the existing summary."
			)
		]


class DailySummariesByMonthListSerializer(serializers.ListSerializer):
	def to_representation(self, data):
		data = data.filter(date__year=self.context['request'].query_params.get('year'), date__month=self.context['request'].query_params.get('month'))
		return super().to_representation(data)


class DailySummariesByMonthSerializer(serializers.ModelSerializer):
	class Meta:
		list_serializer_class = DailySummariesByMonthListSerializer
		model = DailySummary
		fields = ('date', 'workdays', 'visits', 'noshows', 'provider')
		

#previous attempt using serializermethodfield
# class DailySummariesByMonthSerializer(serializers.ModelSerializer):
# 	daily_summaries = serializers.SerializerMethodField()

# 	def get_daily_summaries(self, practice):
# 		if self.context['request'].query_params.get('year') and self.context['request'].query_params.get('month'):
# 			year = self.context['request'].query_params.get('year')
# 			month = self.context['request'].query_params.get('month')
# 			qs = DailySummary.objects.filter(practice=practice.slug, date__month=month, date__year=year)
# 			serializer = DailySummarySerializer(instance=qs, many=True)
# 			return serializer.data
# 		if self.context['request'].query_params.get('year') is None:
# 			qs = DailySummary.objects.filter(practice=practice.slug)
# 			serializer = DailySummarySerializer(instance=qs, many=True)
# 			return serializer.data

# 	class Meta:
# 		model = DailySummary 
# 		fields = "__all__"

class ProviderSerializer(serializers.ModelSerializer):
	full_name = serializers.SerializerMethodField()

	def get_full_name(self, provider):
		return "{}, {} {}".format(provider.last_name, provider.first_name, provider.credentials) 

	class Meta:
		model = Provider	
		fields = ('full_name', 'first_name', 'last_name', 'credentials')


class PracticeSerializer(serializers.ModelSerializer):
	providers = ProviderSerializer(many=True, read_only=True)
	daily_summaries = DailySummariesByMonthSerializer(many=True, read_only=True)

	class Meta:
		model = Practice 
		fields = ('name', 'slug', 'providers', 'daily_summaries')


class PracticeListSerializer(serializers.ModelSerializer):
	entity = serializers.SlugRelatedField(slug_field='slug', read_only=True)

	class Meta:
		model = Practice
		fields = ("name", "slug", "entity")



class EntitySerializer(serializers.ModelSerializer):
	practices = PracticeSerializer(many=True, read_only=True)
	
	class Meta:
		model = Entity
		fields = ('name', 'slug', 'practices')


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

