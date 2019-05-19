from django.urls import path, include
from practices import views 
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "practices"

urlpatterns = [
	path('entities/', views.EntityList.as_view(), name="entity_list"),
	path('entities/<slug:slug>/', views.EntityDetail.as_view(), name="entity_detail"),
	path('practices/<slug:slug>/', views.PracticeDetail.as_view(), name='practice_detail'),
	path('daily_summaries/', views.FilteredDailySummaries.as_view(), name='daily_summaries'),
	path('daily_summaries/<int:pk>/', views.DailySummaryDetail.as_view(), name="daily_summary_detail"),
	# path('login/', obtain_auth_token, name='login'),
	path('token/', views.CreateTokenView.as_view(), name='create_token'),
]