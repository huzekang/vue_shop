<template>
  <div id="my-json-editor">
    <p>Json 编辑器</p>
    <!--在模板中使用vue-json-editor-->
    <vue-json-editor v-model="json" :showBtns="true" @json-change="onJsonChange"></vue-json-editor>
  </div>
</template>

<script>
  // 引入vue-json-editor模块
  import vueJsonEditor from 'vue-json-editor'

  export default {
    data() {
      return {
        json: {
          'job': {
            'setting': {
              'speed': {
                'channel': 3
              },
              'errorLimit': {
                'record': 0,
                'percentage': 0.02
              }
            },
            'content': [
              {
                'reader': {
                  'name': 'mysqlreader',
                  'parameter': {
                    'username': 'root',
                    'password': 'root',
                    'column': [
                      'id',
                      'name'
                    ],
                    'splitPk': 'db_id',
                    'connection': [
                      {
                        'table': [
                          'table'
                        ],
                        'jdbcUrl': [
                          'jdbc:mysql://127.0.0.1:3306/database'
                        ]
                      }
                    ]
                  }
                },
                'writer': {
                  'name': 'streamwriter',
                  'parameter': {
                    'print': true
                  }
                }
              }
            ]
          }
        }
      }
    },

    // 注入vueJsonEditor组件
    components: {
      'vue-json-editor': vueJsonEditor
    },

    methods: {
      onJsonChange(value) {
        console.log('value:', value)
      }
    }
  }
</script>
