# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:

    # url(r'^NodeSite/', include('NodeSite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^accounts/', include('NodeSite.accounts.urls')),
)

# 账户设置，系统设置 
urlpatterns += patterns('NodeSite.views',
                        url(r'^$', 'home', name='home'),
                        
                        # url(r'^accounts/login/$', 'signin', name='signin'),                #登录
                        # url(r'^accounts/logout/$', 'signout', name='signout'),                #退出
                        # url(r'^accounts/signup/$', 'signup', name='signup'),                #注册
                        # url(r'^accounts/profile/$', 'profile', name='profile'),                #用户信息
                        url(r'^mushroom/settings/$', 'settings', name='m_settings'),
                        )

# Test
# test message
urlpatterns += patterns('NodeSite.views',
                        (r'^playlist/create/$', 'create_playlist'),
)
