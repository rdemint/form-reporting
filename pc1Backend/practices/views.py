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
from practices.serializers import DailySummarySerializer, ProviderSerializer, EntitySerializer, PracticeSerializer, AuthTokenSerializer
from django_filters import rest_framework as filters


class DailySummaryFilter(filters.FilterSet):
	month = filters.NumberFilter(field_name="date", lookup_expr="month")
	year = filters.NumberFilter(field_name="date", lookup_expr="year")
	entity = filters.CharFilter(field_name="entity__slug", lookup_expr="iexact")
	practice = filters.CharFilter(field_name="practice__slug", lookup_expr="iexact")
	provider = filters.CharFilter(field_name="provider", lookup_expr='iexact')

	class Meta:
		model = DailySummary
		fields = ['month', 'year', 'entity', 'practice', 'provider']


class FilteredDailySummaries(ListCreateAPIView):
	queryset = DailySummary.objects.all()
	serializer_class = DailySummarySerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filterset_class = DailySummaryFilter

	# def post(self,request,*args,**kwargs):
	# 	print(self.request.data)
	# 	return self.create(request, *args, **kwargs)


class DailySummaryDetail(RetrieveUpdateDestroyAPIView):
	queryset = DailySummary.objects.all()
	serializer_class = DailySummarySerializer 


class EntityList(ListCreateAPIView):
	serializer_class = EntitySerializer
	queryset = Entity.objects.all()


class EntityDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = EntitySerializer 
	lookup_field = "slug"

	def get_queryset(self):
		return Entity.objects.filter(slug=self.kwargs.get('slug'))


class PracticeDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = PracticeSerializer
	lookup_field = "slug"

	def get_queryset(self):
		return Practice.objects.filter(slug=self.kwargs.get('slug'))

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
			'user_type': user.user_type,
			'user_id': user.id
			
			})
	
