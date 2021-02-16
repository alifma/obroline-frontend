<template>
  <div class="container" style="height:100vh">
    <div class="row h-100">
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
      <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
        <div class="card p-4 shadow" style="border-radius:25px">
          <div class="card-body">
            <router-link to="/login" class="float-left text-main mb-0"> <b-icon-arrow-left></b-icon-arrow-left> </router-link>
            <h4 class="text-main text-center my-3">Register</h4>
            <p class="mt-4">Let's create your account!</p>
            <form action="" class="my-4">
              <div class="form-group mb-4">
                <label class="text-secondary">Name</label>
                <input type="text" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black" value="Admin Obroline">
              </div>
              <div class="form-group mb-4">
                <label class="text-secondary">Email</label>
                <input type="email" class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black" value="obroline@gmail.com">
              </div>
              <div class="form-group mt-4">
                <label class="text-secondary">Password</label>
                <input type="password" value="password"
                  class="px-0 font-weight-bold form-control border-top-0 border-left-0 border-right-0"
                  style="border-bottom:2px solid black">
              </div>
              <button class="btn btn-main w-100 font-weight-bold my-3"
                style="border-radius:50px;height:60px">Register</button>
              <div class="row text-center text-secondary">
                <div class="col-4 my-auto">
                  <hr style="height:1.5px;border:none;color:#6C757D;background-color:#6C757D;">
                </div>
                <div class="col-4 my-auto">
                  <p class="mb-0 ">Register with</p>
                </div>
                <div class="col-4 my-auto">
                  <hr style="height:1.5px;border:none;color:#6C757D;background-color:#6C757D;">
                </div>
              </div>
              <button class="btn btn-sub w-100 font-weight-bold my-3" style="border-radius:50px;height:60px">
                <b-icon-google></b-icon-google> Google
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-2 col-lg-3 my-auto">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
