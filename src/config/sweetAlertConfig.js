/**
 * Created by ycb on 2017/4/26.
 */
export default {
  error(title,confirmButtonText){
    console.log(this);
      this.$swal({
      title: title,
      type: 'error',
      confirmButtonText: confirmButtonText,
    })
  }
}
