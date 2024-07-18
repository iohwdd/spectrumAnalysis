<template>
    <div class="layout-body">
      <el-container>
        <el-aside class="aside" :style="{ width: asideWidth + 'px' }">
          <div class="logo">
            <span v-if="!menuCollapse">光谱仪集成软件分析系统</span>
          </div>
          <div class="menu-panel">
            <el-menu
              :default-openeds="defalutOpends"
              :collapse-transition="false"
              :collapse="menuCollapse"
              :default-active="defaultActive"
              router
              background-color="#3d3c4a"
              active-text-color="#fff"
              text-color="#fff"
              class="el-menu-vertical-demo"
            >
              <template v-for="item in menuList" :key="item.path">
                <el-sub-menu v-if="item.childern" :index="item.path">
                  <template #title>
                    <i :class="['iconfont', item.icon]"></i>
                    <span class="menu-name">{{ item.menuName }}</span>
                  </template>
                  <el-menu-item
                    v-for="subItem in item.childern"
                    :index="subItem.path"
                    :key="subItem.path"
                  >
                    <span class="menu-name">{{ subItem.menuName }}</span>
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                  <template #title>
                    <i :class="['iconfont', item.icon]"></i>
                    <span class="menu-name">{{ item.menuName }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
        </el-aside>
        <el-container>
          <el-header class="header">
            <!-- 收起侧边栏 -->
            <!-- <div
              :class="[
                'op-menu',
                'iconfont',
                menuCollapse ? 'icon-expand' : 'icon-collapse'
              ]"
              @click="opMenu"
            ></div> -->
            <!-- 面包屑 -->
            <div class="menu-bread">
              <el-breadcrumb>
                <template
                  v-for="(item, index) in menuBreadCrumbList"
                  :key="index"
                >
                  <el-breadcrumb-item v-if="item.name">
                    {{ item.name }}
                  </el-breadcrumb-item>
                </template>
              </el-breadcrumb>
            </div>
          </el-header>
          <el-main class="main-content">
            <!-- 标签栏 -->
            <div class="tag-content">
              <el-tabs
                type="card"
                v-model="defaultActive"
                @tab-change="tabClick"
                @edit="editTab"
              >
                <el-tab-pane
                  v-for="(item, index) in tabList"
                  :key="index"
                  :name="item.path"
                  :label="item.menuName"
                  :closable="tabList.length > 1"
                >
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="content-body">
              <router-view />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

  <script setup>
  import {
    ref,
    reactive,
    getCurrentInstance,
    nextTick,
    watch,
    onMounted
  } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  // onMounted(() => {
  //   let userInfo = proxy.VueCookies.get('userInfo')
  //   if (userInfo == null) {
  //     proxy.Message.error('请先登录')
  //     router.push('/login')
  //   }
  // })
  // 系统菜单
  const menuList = [
    {
      menuName: '用户中心',
      path: '/ucenter',
      icon: 'icon-account',
      childern: [
        {
          menuName: '个人信息',
          path: '/ucenter/about'
        },
        {
          menuName: '申请成为管理员',
          path: '/ucenter/apply'
        },
        {
          menuName: '修改密码',
          path: '/ucenter/modifyPassword'
        }

      ]
    },
    {
      menuName: '光谱处理与分析',
      path: '/spectrum',
      icon: 'icon-article',
    },
    {
      menuName: '建模分析',
      path: '/model',
      icon: 'icon-article',
    },
    {
      menuName: '收藏夹',
      path: '/package',
      icon: 'icon-login',
      childern: [
        {
          menuName: '我的算法',
          path: '/package/algorithm'
        },
        {
          menuName: '我的光谱',
          path: '/package/spectrum'
        },
        {
          menuName: '回收站',
          path: '/package/recycle'
        }
      ]
    },
    {
      menuName: '用户管理',
      path: '/userAdmin',
      icon: 'icon-user-filling'
    },
    {
      menuName: '标准库管理',
      path: '/specLibAdmin',
      icon: 'icon-article'
    },
    {
      menuName: '算法库管理',
      path: '/algoLibAdmin',
      icon: 'icon-article'
    },
    {
      menuName: '审核管理',
      path: '/auditAdmin',
      icon: 'icon-eye'
    },
    {
      menuName: '日志管理',
      path: '/logAdmin',
      icon: 'icon-article'
    },
    {
      menuName: '类型管理',
      path: '/typeAdmin',
      icon: 'icon-article'
    },
    {
      menuName: '备份与还原',
      path: '/dataAdmin',
      icon:'icon-settings'
    }
  ]
  const menuMap = ref({})

//默认展开的菜单
const defalutOpends = ref([])
const init = () => {
  menuList.forEach((item) => {
    defalutOpends.value.push(item.path)
    menuMap[item.path] = item
    if(item.childern != null) {
        item.childern.forEach((subItem) => {
        menuMap[subItem.path] = subItem
      })
    }
  })
}
init()
//收起关闭菜单
const menuCollapse = ref(false)
const asideWidth = ref(250)
const opMenu = () => {
  menuCollapse.value = !menuCollapse.value
  if (menuCollapse.value) {
    asideWidth.value = 63
  } else {
    asideWidth.value = 250
  }
}
//tab操作
const tabList = ref([])
const tabClick = (e) => {
  router.push(e)
}
const editTab = (targetKey, action) => {
  if (action !== 'remove') {
    return
  }
  // 删除标签
  let tabs = tabList.value
  let currentMenu = defaultActive.value.path
  if (targetKey == defaultActive.value) {
    tabs.forEach((item, index) => {
      if (item.path == targetKey) {
        let nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          currentMenu = nextTab.path
        }
      }
    })
  }
  tabList.value = tabList.value.filter((item) => {
    return item.path !== targetKey
  })
  if (currentMenu !== defaultActive.value) {
    router.push(currentMenu)
  }
}
//面包屑导航
const menuBreadCrumbList = ref([])
//默认选中
const defaultActive = ref()
watch(
  () => route,
  (newVal, oldVal) => {
    defaultActive.value = route.path
    menuBreadCrumbList.value = route.matched
    let currentMenu = tabList.value.find((item) => {
      return item.path == defaultActive.value
    })
    if (!currentMenu) {
      tabList.value.push(menuMap[route.path])
      console.log(tabList.value)
    }
  },
  { immediate: true, deep: true }
)
  </script>
<style lang="scss" scoped>
.layout-body {
  .aside {
    background: #2b2b35;
    .logo {
      background: #1b1b2b;
      display: flex;
      color: #fff;
      height: 60px;
      align-items: center;
      font-size: 20px;
      padding-left: 20px;
      font-weight: bold;
      transition: all 0.3s;
    }
    .menu-panel {
      height: calc(100vh - 60px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #d3d3d3 #2b2b35;
    }
    .menu-panel::-webkit-scrollbar {
      width: 8px;
    }
    .menu-panel::-webkit-scrollbar-track {
      background: #2b2b35;
    }
    .menu-panel::-webkit-scrollbar-thumb {
      background-color: #d3d3d3; // 柔和的灰色
      border-radius: 10px;
      border: 2px solid #2b2b35;
    }
    .menu-name {
      padding-left: 15px;
    }
    .el-menu {
      border-right: none;
    }
    .el-menu-item {
      background: #2b2b35;
      transition: background 0.3s, color 0.3s;
    }
    .el-menu-item.is-active {
      color: #ffca28;
      background: #1b1b2b;
      border-left: 4px solid #ffca28;
    }
    .el-menu-item:hover {
      color: #ffca28;
      background: #1b1b2b;
      border-left: 4px solid #ffca28;
    }
    .el-sub-menu__title {
      color: #fff !important;
      padding-left: 15px !important;
      font-weight: bold;
      transition: color 0.3s;
    }
    .el-sub-menu__title:hover {
      color: #ffca28 !important;
    }
    .el-sub-menu.is-active .el-sub-menu__title {
      color: #ffca28 !important;
    }
  }
  .header {
    background: #fafafa;
    border-bottom: 1px solid #ccc;
    height: 60px;
    line-height: 60px;
    padding: 0px 25px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .op-menu {
      font-size: 26px;
      cursor: pointer;
      color: #333;
      transition: color 0.3s;
    }
    .op-menu:hover {
      color: #ffca28;
    }
    .menu-bread {
      margin-left: 15px;
      font-size: 14px;
    }
  }
  .main-content {
    padding: 0px;
    .tag-content {
      .el-tabs--border-card {
        border: none;
      }
      .el-tabs__content {
        display: none;
      }
      .el-tabs__item.is-active {
        background-color: #fff;
        color: #2b2b35;
        font-weight: bold;
      }
    }
    .content-body {
      overflow: hidden;
      padding: 15px;
      background: #f0f0f0;
      border-top: 1px solid #ccc;
    }
  }
}
</style>

