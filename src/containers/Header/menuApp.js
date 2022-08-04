export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.user', menus: [
            {
                name: 'menu.admin.manage-user.manage-doctor',link: '/system/user-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {name: 'menu.admin.manage-user.manage-admin',link: '/system/user-admin'},
            {name: 'menu.admin.manage-user.crud',link: '/system/user-manage'},
            {name: 'menu.admin.manage-user.crud-redux',link: '/system/user-redux'}
        ]
    },
        { //Quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
            {name: 'menu.admin.manage-clinic',link: '/system/manage-clinic'}
        ]
    },
        { //Quản lý chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {name: 'menu.admin.manage-specialty',link: '/system/manage-specialty'}
        ]
    },
        { //Quản lý cẩm nang "bài viết"
        name: 'menu.admin.handbook', menus: [
            {name: 'menu.admin.manage-handbook',link: '/system/manage-handbook'}
        ]
    },
];
