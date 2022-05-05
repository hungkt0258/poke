export class RoleConfig {
    public static RoleString = {
        ADMIN:                  '1',
        REGION_ADMIN:           '2',
        VIEWER:                 '3',
        ADMIN_COMPANY:          '4',
        STATION_MANAGEMENT:     '9',
    };
    public static RoleNumber = {
        ADMIN:          1,
        REGION_ADMIN:   2,
        VIEWER:         3,
        ADMIN_COMPANY:  4,
        STATION_MANAGEMENT: 9
    };
    public static RoleStringMapRoleNumber = {
        [RoleConfig.RoleString.ADMIN]:          RoleConfig.RoleNumber.ADMIN,
        [RoleConfig.RoleString.REGION_ADMIN]:   RoleConfig.RoleNumber.REGION_ADMIN,
        [RoleConfig.RoleString.VIEWER]:         RoleConfig.RoleNumber.VIEWER,
        [RoleConfig.RoleString.ADMIN_COMPANY]:  RoleConfig.RoleNumber.ADMIN_COMPANY,
        [RoleConfig.RoleString.STATION_MANAGEMENT]:  RoleConfig.RoleNumber.STATION_MANAGEMENT,
    };
    public static RoleNumberMapRoleString = {
        [RoleConfig.RoleNumber.ADMIN]:          RoleConfig.RoleString.ADMIN,
        [RoleConfig.RoleNumber.REGION_ADMIN]:   RoleConfig.RoleString.REGION_ADMIN,
        [RoleConfig.RoleNumber.VIEWER]:         RoleConfig.RoleString.VIEWER,
        [RoleConfig.RoleNumber.ADMIN_COMPANY]:  RoleConfig.RoleString.ADMIN_COMPANY,
        [RoleConfig.RoleNumber.STATION_MANAGEMENT]:  RoleConfig.RoleString.STATION_MANAGEMENT,
    }
    public static RolePermission = {
        '/home': [RoleConfig.RoleString.ADMIN , RoleConfig.RoleString.REGION_ADMIN, RoleConfig.RoleString.STATION_MANAGEMENT],
        '/report': [RoleConfig.RoleString.ADMIN , RoleConfig.RoleString.REGION_ADMIN],
        '/routes_monitor': [RoleConfig.RoleString.ADMIN , RoleConfig.RoleString.REGION_ADMIN],
        '/route_management': [RoleConfig.RoleString.ADMIN , RoleConfig.RoleString.REGION_ADMIN],
        '/bus_trip': [RoleConfig.RoleString.ADMIN , RoleConfig.RoleString.REGION_ADMIN],
        '/routes_map': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN ],
        '/stations': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN, RoleConfig.RoleString.STATION_MANAGEMENT],
        '/routes': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN ],
        '/type_location': [RoleConfig.RoleString.ADMIN],
        '/location': [RoleConfig.RoleString.ADMIN],
        '/route_alerts': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN],
        '/route_notifications': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN],
        '/regions': [RoleConfig.RoleString.ADMIN],
        '/logs': [RoleConfig.RoleString.ADMIN],
        '/users': [RoleConfig.RoleString.ADMIN],
        '/role_manage': [RoleConfig.RoleString.ADMIN],
        '/countries': [RoleConfig.RoleString.ADMIN],
        '/route_insights': [RoleConfig.RoleString.ADMIN],
        '/activity_schedule': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN],
        '/station_media_report': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN],
        '/station_feedback_report': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN],
        '/station_editing_report': [RoleConfig.RoleString.ADMIN, RoleConfig.RoleString.REGION_ADMIN],
        '/system_ad_stores': [RoleConfig.RoleString.ADMIN],
        '/user_feedbacks': [RoleConfig.RoleString.ADMIN,  RoleConfig.RoleString.REGION_ADMIN],
        '/analytics': [RoleConfig.RoleString.ADMIN,  RoleConfig.RoleString.REGION_ADMIN],
        '/bus_data': [RoleConfig.RoleString.ADMIN,  RoleConfig.RoleString.REGION_ADMIN],
    }
  }