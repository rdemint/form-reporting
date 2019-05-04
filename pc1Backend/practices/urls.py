from django.urls import path, include
from practices import views 
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "practices"

urlpatterns = [
	path('', views.api_root, name="api_root"),
	path('users/', views.UserCreate.as_view(), name="user_create"),
	path('users/<int:pk>', views.UserDetail.as_view(), name="user_detail"),
	path('providers/', views.ProviderList.as_view(), name="provider_list"),
	path('providers/<int:pk>', views.ProviderDetail.as_view(), name="provider_detail"),
	path('practices/', views.PracticeList.as_view(), name="practice_list"),
	path('practices/<slug:slug>/', views.PracticeDetail.as_view(), name="practice_detail"),
	path('practices/<slug:slug>/daily_summaries/', views.PracticeDailySummaryList.as_view(), name='practice_summaries'),
	path('daily_summaries/', views.DailySummaryList.as_view(), name="daily_summary_list"),
	path('daily_summaries/<int:pk>/', views.DailySummaryDetail.as_view(), name="daily_summary_detail"),
	path('entities/', views.EntityList.as_view(), name="entity_list"),
	path('entities/<slug:slug>/', views.EntityDetail.as_view(), name="entity_detail"),
	path('entities/<slug:slug>/daily_summaries/', views.EntitySummaryDetail.as_view(), name="entity_summary_detail"),
	path('login/', obtain_auth_token, name='login'),
	path('token/', views.CreateTokenView.as_view(), name='create_token'),
]

