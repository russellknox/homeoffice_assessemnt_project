(function(window){

  $ = window.jQuery

  $('.js-shortList').on('click', function(){

    const applicantId = ($(this).data('id'))

    $.post({
      url: 'shortList/' + applicantId,
      data: {
        applicantId
      }
    }).success((response) => {
       console.log('response')
       location.reload()
    })
  })

})(window)
