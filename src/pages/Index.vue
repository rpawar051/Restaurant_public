<template>
  <div class="q-pa-md">
     <div class="q-gutter-xl">
      <q-dialog v-model="data.alert">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  {{ error }}
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          <div class="row q-gutter-xl">
          <div class="col-md-2">
            <q-img
                src="../assets/icon.jpg"
                height= "100%"
                width= "75%"
                @load="filter_categories"
            />
          </div>
          <div class="col-md-2">
            <q-input
              filled
              v-model="data.name"
              label="Restaurant name *"
              hint="Enter Restaurant name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="col-md-2">
            <q-input
              filled
              type="text"
              v-model="data.city"
              label="Enter City name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="col-md-2">
          <q-btn label="Submit" type="submit" color="green" clickable @click="add"/>
          </div>
          <div class="col-md-2">
          <q-input bottom-slots v-model="data.search" label="Search Restaurant" counter maxlength="30" :dense="dense">

            <template v-slot:after>
              <q-btn round dense flat icon="search" clickable @click="search"/>
            </template>
          </q-input>
          </div>
          </div>
          <div class="q-pa-sm items-start q-gutter-md">
            <q-card v-for="i in restaurant_data" :key="i">
              <div class="row q-pl-sm">
                <q-dialog v-model="i.value" transition-show="rotate" transition-hide="rotate">
                  <q-card width= "100%">
                    <q-card-section>
                       <q-card-actions align="right">
                          <q-btn icon="close" flat round dense v-close-popup />
                       </q-card-actions>
                       <div class="text-h5">{{ i.name }}</div><span>City : {{ i.city }} </span>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <div class="row q-gutter-lg">
                        <div class="col-md-6">
                        <q-img
                          :src="i.image0"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                        <div class="col-md-6">
                        <q-img
                          :src="i.image1"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                      </div><br />
                      <div class="row q-gutter-lg">
                        <div class="col-md-6">
                        <q-img
                          :src="i.image2"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                        <div class="col-md-6">
                        <q-img
                          :src="i.image3"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                      </div><br />
                      <div class="row q-gutter-lg">
                        <div class="col-md-6">
                        <q-img
                          :src="i.image4"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                        <div class="col-md-6">
                        <q-img
                          :src="i.image5"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                      </div><br />
                      <div class="row q-gutter-lg">
                        <div class="col-md-6">
                        <q-img
                          :src="i.image6"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                        <div class="col-md-6">
                        <q-img
                          :src="i.image7"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                      </div><br />
                      <div class="row q-gutter-lg">
                        <div class="col-md-6">
                        <q-img
                          :src="i.image8"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                        <div class="col-md-6">
                        <q-img
                          :src="i.image9"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                      </div><br />
                      <div class="row q-gutter-lg">
                        <div class="col-md-6">
                        <q-img
                          :src="i.image10"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                        <div class="col-md-6">
                        <q-img
                          :src="i.image11"
                          class="rounded-borders"
                          height= "100%"
                          width= "250px"/>
                        </div>
                      </div><br />
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <div class="col text-black text-subtitle2 text-weight-bolder">
                  {{ i.name }}
                </div>
                <div class="col text-black">
                  city: {{ i.city }}
                </div>
                <q-btn label="View" type="submit" color="green" clickable @click="$router.replace(i.value= true)"/>
                <q-btn label="Delete" type="submit" color="green" :id="i.id" clickable @click="delete_value(i.id)" />
              </div>
            </q-card>
          </div>
      </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageIndex',
  data () {
    return {
      data: {
        search: '',
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
          sessionStorage.setItem('res_id', res.data.res_id)
          console.log(sessionStorage.getItem('res_id'))
          console.log(res.data.title)
          this.error = res.data.title
          this.data.alert = true
          this.$router.push('/upload')
        }
      }, err => {
        console.log(err.response)
      })
    },
    filter_categories () {
      console.log('test')
      const categories = {}
      this.restaurant_data = []
      axios.post('http://localhost:5000/restaurant_data', categories).then(res => {
        if (res.status === 200) {
          console.log(res.data.result)
          for (let i = 0; i < res.data.result.length; i++) {
            this.restaurant_data = this.restaurant_data.concat({ id: res.data.result[i]._id, name: res.data.result[i].name, value: false, city: res.data.result[i].city, image0: 'http://localhost:5000/' + res.data.result[i].image0, image1: 'http://localhost:5000/' + res.data.result[i].image1, image2: 'http://localhost:5000/' + res.data.result[i].image2, image3: 'http://localhost:5000/' + res.data.result[i].image3, image4: 'http://localhost:5000/' + res.data.result[i].image4, image5: 'http://localhost:5000/' + res.data.result[i].image5, image6: 'http://localhost:5000/' + res.data.result[i].image6, image7: 'http://localhost:5000/' + res.data.result[i].image7, image8: 'http://localhost:5000/' + res.data.result[i].image8, image9: 'http://localhost:5000/' + res.data.result[i].image9, image10: 'http://localhost:5000/' + res.data.result[i].image10, image11: 'http://localhost:5000/' + res.data.result[i].image11 })
          }
        }
        console.log('test value : ', this.opt_categories)
      })
    },
    search () {
      console.log(this.data.search)
      const categories = {
        name: this.data.search
      }
      this.restaurant_data = []
      axios.post('http://localhost:5000/restaurant_data', categories).then(res => {
        if (res.status === 200) {
          console.log(res.data.result)
          for (let i = 0; i < res.data.result.length; i++) {
            this.restaurant_data = this.restaurant_data.concat({ name: res.data.result[i].name, value: false, city: res.data.result[i].city, image0: 'http://localhost:5000/' + res.data.result[i].image0, image1: 'http://localhost:5000/' + res.data.result[i].image1, image2: 'http://localhost:5000/' + res.data.result[i].image2, image3: 'http://localhost:5000/' + res.data.result[i].image3, image4: 'http://localhost:5000/' + res.data.result[i].image4, image5: 'http://localhost:5000/' + res.data.result[i].image5, image6: 'http://localhost:5000/' + res.data.result[i].image6, image7: 'http://localhost:5000/' + res.data.result[i].image7, image8: 'http://localhost:5000/' + res.data.result[i].image8, image9: 'http://localhost:5000/' + res.data.result[i].image9, image10: 'http://localhost:5000/' + res.data.result[i].image10, image11: 'http://localhost:5000/' + res.data.result[i].image11 })
          }
        }
        console.log('test value : ', this.opt_categories)
      })
    },
    delete_value (id) {
      var i = document.getElementById(id).id
      console.log(i)
      const categories = {
        _id: i
      }
      axios.post('http://localhost:5000/restaurant_data_delete', categories).then(res => {
        if (res.status === 200) {
          // this.restaurant_data = []
          console.log('deleted!')
          console.log(res.data.title)
          this.error = res.data.title
          // this.alert = true
          this.filter_categories()
        }
      })
    }
  }
}
</script>
