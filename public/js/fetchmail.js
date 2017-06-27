window.onload = function() {
    var socket = io.connect('http://localhost:3700');
    var emailList = document.getElementById("inbox")
    var numEmailsDisplay = document.getElementById("num-emails")

    // Each page should fetch NUMBER of IMAILs every so often
    // Only when user clicks on inbox should the actual IMAILs be retrieved
    // When the inbox is closed, setinterval should cease for fetching of catual emails

    socket.on('fetchIMailCount', function (data) {
        console.log("A new mail awaiteth thee!")
    });

    var mailFetcher = null,
        interval = 5000;

    function fetchIMail(){
      fetch('http://localhost:3700/api/mail/fetchimail', {credentials: 'include'}).then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
           return response.json().then(json => {
              return response.ok ? json : Promise.reject(json);
           });
        } else {
           return response.text().then(text => {
               return response.ok ? text : Promise.reject(text);
           });
        }
      }).then((imails) => {
        // do what you want with imails
        for(var i=0; i<imails.length; i++) {
          $('<li class="imail-list-item"><a href="/imail/'+ imails[i]._id +'">'+ imails[i].body +'</a></li>').insertBefore('#full-inbox-li')
        }
      }).catch((err) => {
        console.log(err)
      });
    }

    function fetchIMailCount(){
      fetch('http://localhost:3700/api/mail/fetchimailcount', {credentials: 'include'}).then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
           return response.json().then(json => {
              return response.ok ? json : Promise.reject(json);
           });
        } else {
           return response.text().then(text => {
               return response.ok ? text : Promise.reject(text);
           });
        }
      }).then((imailcount) => {
        // do what you want with imails
        imailcount > 0 ? $(numEmailsDisplay).html(imailcount  + ' NEW') : ''
      }).catch((err) => {
        $(numEmailsDisplay).html('err')
      });
    }

    // Handle IMail inbox bug mails
    $('#inbox').on('click', function(){
      //fetchIMail()
      mailFetcher = setInterval(() => {
        fetchIMail()
      }, interval);
    }).on('blur', function(){
      clearInterval(mailFetcher)
      mailFetcher = null
    })

    // Handle Imail inbox bug count
    fetchIMailCount()
    setInterval(() => {
      fetchIMailCount()
    }, interval);
}
