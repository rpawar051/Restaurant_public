<template>
  <div class="q-pa-md" style="max-width: 500px">
     <div class="q-gutter-xl">
        <q-form action="http://localhost:5000/api/photo" method="post" enctype="multipart/form-data">
          <input type='hidden' name='res_id' v-model='data.id' value='data.id' />
          <q-input filled type='file' multiple='multiple' accept='image/*' name='uploadedImages' id='file' style="max-width: 300px" />
          <q-btn label="Submit" type="submit" color="primary"/>
        </q-form>
    </div>
  </div>
</template>
<script>
var rid = sessionStorage.getItem('res_id')
console.log(rid)
import axios from 'axios'
export default {
  name: 'PageIndex',
  data () {
    return {
      data: {
        id: sessionStorage.getItem('res_id'),
        alert: false
      },
      error: '',
      v: sessionStorage.removeItem('res_id')

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
          sessionStorage.setItem('res_id', res.data.res_is)
          this.error = res.data.title
          this.alert = true
          this.$router.push('/upload')
        }
      }, err => {
        console.log(err.response.data.title)
        this.error = err.response.data.error
        this.alert = true
      })
    }
  }
}
</script>
