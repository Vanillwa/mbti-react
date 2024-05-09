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
    timer : showConfirmButton ? '' : 1500
  })
}

const sweetalert = {
    success(title, text, showConfirmButton, buttonText){
      return confirm('success', title, text, buttonText, showConfirmButton)
    },
    error(title, text, buttonText){
      return confirm('error', title, text, buttonText)
    },
    warning(title, text, buttonText){
      return confirm('warning', title, text, buttonText)
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