from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.reverse import reverse 
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from practices.models import Practice, DailySummary, User
from practices.serializers import DailySummarySerializer, PracticeListSerializer, PracticeSerializer, UserSerializer, AuthTokenSerializer
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


class DailySummaryList(ListCreateAPIView):
	serializer_class = DailySummarySerializer
	queryset = DailySummary.objects.all()
	permssion_classes = (IsAuthenticated,)

class PracticeDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = PracticeSerializer
	lookup_field = "slug"
	permssion_classes = (IsAuthenticated,)

	def get_queryset(self):
		return Practice.objects.filter(slug=self.kwargs['slug'])

class DailySummaryDetail(RetrieveUpdateDestroyAPIView):
	serializer_class = DailySummarySerializer
	queryset = DailySummary.objects.all()
	permssion_classes = (IsAuthenticated,)
	'''
	def list(self, request):
		queryset  = self.queryset()
		serializer = DailySummarySerializer(queryset, many=True)
		return Response(serializer.data)
	'''

class CreateTokenView(ObtainAuthToken):
	serializer_class = AuthTokenSerializer
	renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

	def post(self, request, *args, **kwargs):
		serializer = self.serializer_class(data=request.data, context={'request': request})
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		token, created = Token.objects.get_or_create(user=user)
		slug = user.practice.slug
		return Response({'token': token.key, 'slug': slug})
	
