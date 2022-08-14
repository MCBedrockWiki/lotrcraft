
var comment_template;
var comment_section_template;

var data_comments;

 async function load_library() {
    let myPromise = new Promise(function(resolve) {
      let req = new XMLHttpRequest();
      req.open('GET', "./element/library.html");
      req.onload = function() {
        if (req.status == 200) {
          
          //console.log(req.response); 
          var parser = new DOMParser();
          doc = parser.parseFromString(req.response, "text/html");
          
          //START PULLING TEMPLATE DATA
          comment_template = doc.querySelector("#library_comment").content;
          comment_section_template = doc.querySelector("#library_comment_section").content;
          console.log('Finished setting variables ');  

          resolve(req.response);

        } else {
          resolve("File not Found");
        }
      };
      req.send();
    });

    return await myPromise;
  }

  async function load_page_comments(pageName) {
    let myPromise = new Promise(function(resolve) {
      let req = new XMLHttpRequest();
      req.open('GET', "./data/comments.json");
      req.onload = function() {
        if (req.status == 200) {
          doc = JSON.parse(req.response);

          data_comments = doc.pages.filter( element => element.host_page == pageName);

          resolve(req.response);

        } else {
          resolve("File not Found");
        }
      };
      req.send();
    });

    return await myPromise;
  }