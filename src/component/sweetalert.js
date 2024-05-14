import Swal from 'sweetalert2'

const swalButton = Swal.mixin({
  customClass : {
    confirmButton : 'btn btn-primary me-3',
    cancelButton : 'btn btn-danger'
  },
  buttonsStyling : false
})

const confirm = (
  icon,
  title,
  text,
  confirmButtonText = '확인',
  showConfirmButton = true
)=>{
  return swalButton.fire({
    icon,
    title,
    text,
    confirmButtonText,
    timer : 3000
  })
}

const sweetalert = {
    success(title, text, showConfirmButton, buttonText, timer){
      return confirm('success', title, text, buttonText, showConfirmButton, timer)
    },
    error(title, text, buttonText){
      return confirm('error', title, text, buttonText)
    },
    warning(title, text, confirmButtonText, cancelButtonText){
      return confirm('warning', title, text, confirmButtonText, cancelButtonText)
    },
    question(title, text, confirmButtonText, cancelButtonText){
      return swalButton.fire({
        icon : 'question',
        title,
        text,
        showCancelButton : true,
        confirmButtonText,
        cancelButtonText
      })
    }
  }

  export default sweetalert;