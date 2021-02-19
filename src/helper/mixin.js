import Swal from 'sweetalert2'
export const obrolinemixin = {
  data () {
    return {
      baseURL: process.env.VUE_APP_WEB_URL,
      Toast: Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }),
      loginSessionHandler: {},
      searchName: ''
    }
  },
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    },
    swalToast (icon, title) {
      this.Toast.fire({
        icon,
        title
      })
    },
    swalAlert (title, text, icon) {
      Swal.fire({
        icon,
        title,
        text
      })
    },
    alertToast (variant, title) {
      if (variant === 'error') {
        variant = 'danger'
      }
      this.$bvToast.toast(title, {
        title: 'POSvue Notification',
        variant: variant,
        toaster: 'b-toaster-top-center',
        autoHideDelay: 1000
        // solid: true
      })
    },
    swalLoading (title) {
      Swal.fire({
        title: title,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        }
      })
    },
    swalLoadingClose () {
      Swal.close()
    }
  }
}
