from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.reverse import reverse 
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from practices.models import Practice, DailySummary, User, Entity, Provider
from practices.serializers import DailySummarySerializer, PracticeSerializer, UserSerializer, AuthTokenSerializer, EntitySerializer, PracticeListSerializer, ProviderSerializer
# Create your views here.


@api_view(['GET'])
def api_root(request, format=None):
	return Response({
		'practices': reverse('practices:practice_list', request=request, format=format),
		'daily_summaries': reverse('practices:daily_summary_list', request=request, format=format)
		})

class UserCreate(ListCreateAPIView):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	permission_classes = ()

class UserDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = UserSerializer
	permissions = IsAuthenticated
	queryset = User.objects.all()


class PracticeList(ListCreateAPIView):
	serializer_class = PracticeListSerializer
	queryset = Practice.objects.all()
	permssion_classes = (IsAuthenticated,)


class PracticeDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = PracticeSerializer
	lookup_field = "slug"
	permssion_classes = (IsAuthenticated,)
	filter_fields = ('daily_summaries__visits')

	def get_queryset(self):
		return Practice.objects.filter(slug=self.kwargs['slug'])
		


class DailySummaryDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = DailySummarySerializer
	queryset = DailySummary.objects.all()
	permssion_classes = (IsAuthenticated,)
	
class ProviderList(ListCreateAPIView):
	serializer_class = ProviderSerializer
	queryset = Provider.objects.all()
	permission_classes = (IsAuthenticated,)


class ProviderDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = ProviderSerializer
	queryset = Provider.objects.all()
	permission_classes = (IsAuthenticated,)


class EntityList(ListCreateAPIView):
	serializer_class = EntitySerializer
	queryset = Entity.objects.all()
	#permission_classes = (IsAuthenticated,)


class EntityDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = EntitySerializer
	queryset = Entity.objects.all()
	#permission_classes = (IsAuthenticated,)
	lookup_field = "slug"

	def get_queryset(self):
		return Entity.objects.filter(slug=self.kwargs['slug'])

class EntitySummaryDetail(ListCreateAPIView):
	serializer_class = DailySummarySerializer
	queryset = DailySummary.objects.all()
	lookup_field = "slug"

	def get_queryset(self):
		year = self.request.query_params.get('year', None)
		month = self.request.query_params.get('month', None)		
		return DailySummary.objects.filter(entity__slug=self.kwargs['slug'], date__year=year, date__month=month)


class CreateTokenView(ObtainAuthToken):
	serializer_class = AuthTokenSerializer
	renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

	def post(self, request, *args, **kwargs):
		serializer = self.serializer_class(data=request.data, context={'request': request})
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		if user.practice is None:
			practice_slug = None
			practice_name = None
		elif user.practice is not None: 
			practice_slug = user.practice.slug
			practice_name = user.practice.name
		if user.entity is None:
			entity_name = None
			entity_slug = None
		elif user.entity is not None:
			entity_slug = user.entity.slug
			entity_name = user.entity.name
			
		token, created = Token.objects.get_or_create(user=user)
		return Response(
			{
			'token': token.key, 
			'practice_slug': practice_slug,
			'entity_slug': entity_slug, 
			'email': user.email, 
			'practice_name': practice_name,
			'entity_name': entity_name, 
			'user_type': user.user_type
			})
	
