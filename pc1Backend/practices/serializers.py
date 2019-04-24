from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from practices.models import Practice, DailySummary, User, Entity 
from django.contrib.auth import get_user_model, authenticate

class PracticeIdSerializer(serializers.ModelSerializer):
	class Meta:
		model = Practice
		fields = ('slug',)

class DailySummarySerializer(serializers.ModelSerializer):
	
	class Meta:
		model = DailySummary
		fields = "__all__"
		validators=[UniqueTogetherValidator(
				queryset=DailySummary.objects.all(),
				fields=('practice', 'date'),
				message="A daily summary for this date already exists.  Choose a new date or edit the existing summary."
			)
		]	

class PracticeSerializer(serializers.ModelSerializer):
	daily_summaries = DailySummarySerializer(many=True)

	class Meta:
		model = Practice 
		fields = "__all__"

class PracticeListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Practice 
		fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
	class Meta: 
		model = get_user_model()
		fields = ('username', 'email', 'password', 'practice', 'entity', 'groups')
		extra_kwargs = {'password': {'write_only': True, 'min_length':5}}

	def create(self, validated_data):
		return get_user_model().objects.create_user(**validated_data)

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

class EntitySerializer(serializers.ModelSerializer):
	practices = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

	class Meta:
		model = Entity
		fields = ('name', 'slug', 'practices')



