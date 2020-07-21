<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-green bg-black">
      <q-toolbar class="text-center">
        <q-toolbar-title>
          Restaurant Directory
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageIndex',
  data () {
    return {
      data: {
        name: '',
        city: '',
        alert: false
      },
      error: '',
      restaurant_data: [],
      basic: true
    }
  },
  methods: {
    add () {
      const newUser = {
        name: this.data.name,
        city: this.data.city
      }
      console.log(newUser)
      axios.post('http://localhost:5000/res_add', newUser).then(res => {
        if (res.status === 200) {
          console.log(res.data.title)
          sessionStorage.setItem('res_id', res.data.res_id)
          console.log(sessionStorage.getItem('res_id'))
          this.error = res.data.title
          this.alert = true
          this.$router.push('/upload')
        }
      }, err => {
        console.log(err.response)
      })
    },
    filter_categories () {
      console.log('test')
      const categories = {}
      axios.post('http://localhost:5000/restaurant_data', categories).then(res => {
        if (res.status === 200) {
          console.log(res.data.result)
          for (let i = 0; i < res.data.result.length; i++) {
            this.restaurant_data = this.restaurant_data.concat({ name: res.data.result[i].name, value: false, city: res.data.result[i].city, image0: 'http://localhost:5000/' + res.data.result[i].image0, image1: 'http://localhost:5000/' + res.data.result[i].image1, image2: 'http://localhost:5000/' + res.data.result[i].image2, image3: 'http://localhost:5000/' + res.data.result[i].image3, image4: 'http://localhost:5000/' + res.data.result[i].image4, image5: 'http://localhost:5000/' + res.data.result[i].image5, image6: 'http://localhost:5000/' + res.data.result[i].image6, image7: 'http://localhost:5000/' + res.data.result[i].image7, image8: 'http://localhost:5000/' + res.data.result[i].image8, image9: 'http://localhost:5000/' + res.data.result[i].image9, image10: 'http://localhost:5000/' + res.data.result[i].image10, image11: 'http://localhost:5000/' + res.data.result[i].image11 })
          }
        }
        console.log('test value : ', this.opt_categories)
      })
    }
  }
}
</script>
