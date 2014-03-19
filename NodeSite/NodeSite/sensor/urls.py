# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url

import views as sensor

urlpatterns = patterns('',
    url(r'^$', sensor.hello, ),
    url(r'^(?P<sensor_id>\d+)$', sensor.sensor, ),
                       url(r'^average/$', sensor.average)
    url(r'^/list/room/(?P<room_id>\d+)$', sensor.room_sensor_list, ),
)