
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-CloudLink').innerHTML),
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudTagsSelector = '.sidebar .tags',
  optAuthorsListSelector = '.sidebar .authors';

const titleClickHandler = function (event) {
  event.preventDefault();                           //zablokowanie domyślnego przewijania strony
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */


  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element & get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;


    /* create HTML of the link */

    // by Handlebars  

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links)

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

function generateTags() {

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);
    tagsList.innerHTML = '';

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      // by Handlebars  

      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.articleLink(linkHTMLData);

      // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      console.log(linkHTML);


      /* add generated code to html variable */

      html = html + linkHTML;

      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

function tagClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('TAG Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');


  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* remove class active */

    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let allTagLink of allTagLinks) {

    /* add class active */

    allTagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.list a')

  /* START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

function generateAuthors() {

  /* [done] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [done] START LOOP: for every article: */

  for (let article of articles) {

    /* find authors wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* [Done] make html variable with empty string */

    let authorHtml = '';

    /* [done] get authors from data-author attribute */

    const articleAuthors = article.getAttribute('data-author')

    /* generate HTML of the link */

    // by Handlebars 

    const linkHTMLData = { id: articleAuthors, title: articleAuthors };
    const authorLinkHTML = templates.articleLink(linkHTMLData);

    //const authorLinkHTML = '<a href="#author-' + articleAuthors + '">' + 'by ' + articleAuthors + '</a>';

    /* add generated code to html variable */

    authorHtml = authorLinkHTML;

    /* insert HTML of all the links into the tags wrapper */

    authorWrapper.innerHTML = authorHtml;

    /* END LOOP: for every article: */
  }

}

function authorClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('author element was clicked !!');


  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');
  console.log('authot: ', author);

  /* find all authors links with class active */

  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let activeAuthorLink of activeAuthorsLinks) {

    /* remove class active */

    activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active author link */

  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let allAuthorLink of allAuthorsLinks) {

    /* add class active */

    allAuthorLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
  console.log('author lists', generateTitleLinks('[data-author="' + author + '"]'));

}

function addClickListenersToAuthors() {
  /* find all links to authors */

  const authorLinks = document.querySelectorAll('.post-author a');


  /* START LOOP: for each authors */

  for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that author */

    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each authors */
  }

}

function generateCloudTags() {

  /*find all articles*/

  const articles = document.querySelectorAll(optArticleSelector);

  const allTags = {}

  /* START LOOP: dor every article */

  for (let article of articles) {

    /* get tags from data-tags attrubute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP : for each tag */

    for (let tag of articleTagsArray) {
      if (!allTags[tag]) allTags[tag] = 1;
      else allTags[tag]++;

      /* END LOOP : for each tag */
    }
    console.log(allTags);
  }

  /*END LOOP for every article */


  /* find all tags */

  const cloudTagsList = document.querySelector(optCloudTagsSelector);

  /* create empytu HTML code */

  // by Handlebars

  const allTagsData = { tags: [] };

  //let html = '';

  /* START LOOP : for each TAG */

  for (let tag in allTags) {

    /* Add tag value for each tags */

    const tagValue = allTags[tag];
    console.log('tag/tagValue: ', tag, tagValue);

    /* create empty class name */

    let className = '';

    /* add classes name for tags */

    if (tagValue > 4) className = 'tag-size-big';
    else if (tagValue > 1) className = 'tag-size-medium';
    else className = 'tag-size-small';

    /* generate HTML code for TAGs */

    //by Handlebars

    allTagsData.tags.push({
      tag: allTags,
      count: allTags[tag],
      className: className,
    });

    /*
    const linkHTML = '<li><a class="' + className + '" href="#tag-' + tag + '"><span>' + tag + '(' + tagValue + ')</span></a></li>';
    html = html + linkHTML;
    */


    /* END LOOP : for each article */
  }

  /* insert generated HTML to tags */

  cloudTagsList.innerHTML = templates.tagCloudLink(allTagsData);

  console.log("lista tagów " + allTagsData);



  //cloudTagsList.innerHTML = html

}

function generateAuthorsList() {

  /*find all articles*/

  const articles = document.querySelectorAll(optArticleSelector);

  /* create new empty object witch all authors */

  const allAuthors = {}

  /* START LOOP: for every article */

  for (let article of articles) {

    /* get authors from data-authors attribute */

    const articleAuthor = article.getAttribute('data-author');

    /* sum qty posts for each authors */

    if (!allAuthors[articleAuthor]) allAuthors[articleAuthor] = 1;
    else allAuthors[articleAuthor]++;

    /*END LOOP for every article */

  }

  console.log(allAuthors);

  /*find author list */

  const authorsList = document.querySelector(optAuthorsListSelector);

  /* create empty html link */

  let html = '';

  for (let author in allAuthors) {

    const authorValue = allAuthors[author];
    console.log('tagValue', authorValue);

    /* generate html of link */

    const linkHtml = '<li><a href="#author-' + author + '"><span>' + author + '(' + authorValue + ')</span></a></li>';

    html = html + linkHtml;

  }

  authorsList.innerHTML = html;

}

generateTitleLinks();
generateAuthors()
generateAuthorsList();
addClickListenersToAuthors();
generateTags();
generateCloudTags();
addClickListenersToTags();