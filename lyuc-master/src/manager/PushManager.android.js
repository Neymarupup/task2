/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';

import LoginManager from './LoginManager';

import * as firebase from 'firebase';
import { Notification } from 'firebase';
import NotificationsAndroid from 'react-native-notifications';
import MessageChat from '../containers/MessageChat/MessageChat';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';


class PushManager {
    pushToken = null;

    constructor() { }

    init() {
        try {
            
            firebase.messaging().onTokenRefresh((token) => {
                console.log('Refresh token: ' + token);
            });
            firebase.notifications().onNotification( async (notification) => {
                console.log('************************************* get push notification');
                var noti_data = notification.data.data;
                noti_data = JSON.parse(noti_data);
                console.log('************************************* get push data', noti_data);
                
                var user_id = await AsyncStorage.getItem('USER_ID');

                if (noti_data.receiver != user_id) return;
                
                if (MessageChat.getInstance()) {
                    MessageChat.getInstance().refreshSingleChart();
                } else {
                    showMessage({
                        message: "New Message",
                        description: noti_data.message,
                        type: "default"
                    });
                }

                firebase.notifications().displayNotification(notification);
            });
            
            firebase.messaging().getToken()
                .then(token => {
                    this.pushToken = token;
                })
                .catch(() => {
                    console.warn('PushManager android: failed to get FCM token'); 
                });

            const channel = new firebase.notifications.Android.Channel('voximplant_channel_id', 'Incoming call channel', firebase.notifications.Android.Importance.Max)
                .setDescription('Incoming call received');
            firebase.notifications().android.createChannel(channel);
        } catch (e) {
            console.warn('React Native Firebase is not set up. Enable google-services plugin at the bottom of the build.gradle file');
        }
    }
    
    getPushToken() {
        return this.pushToken;
    }

    showLocalNotification(from) {
        try {
            const notification = new firebase.notifications.Notification()
                .setNotificationId('notificationId')
                .setSound("default")
                .setTitle('Incoming call');
           // notification.android.setSmallIcon('ic_vox_notification');
            // console.log("notification",notification)
             notification.android.setChannelId('voximplant_channel_id');
            firebase.notifications().displayNotification(notification);
        } catch (e) {
            console.log("warn",e)
            console.warn('React Native Firebase is not set up. Enable google-services plugin at the bottom of the build.gradle file');
        }

    }

    removeDeliveredNotification() {
        try {
            firebase.notifications().removeAllDeliveredNotifications();
        } catch (e) {
            console.warn('React Native Firebase is not set up. Enable google-services plugin at the bottom of the build.gradle file');
        }
    }
}

const pushManager = new PushManager();
export default pushManager;
