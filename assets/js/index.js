const docReady = fn => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(fn, 0);
        return;
    }

    document.addEventListener('DOMContentLoaded', fn);
};

const navigationHandler = elementToSelect => {
    document.querySelector('#menu li.selected')
        .classList.remove('selected');

    elementToSelect.classList.add('selected');
};

const pageHandler = (pageToReveal, pageToHide) => {
    if (pageToHide) {
        pageToHide.classList.add('hidden');
    } else {
        document.querySelectorAll('.page-content').forEach(element => {
            element.classList.add('hidden');
        });
    }
    
    pageToReveal.classList.remove('hidden');
};

const goHome = e => {
    e.preventDefault();
    
    const navigationEl = document.querySelector('#menu .home').parentElement;
    navigationHandler(navigationEl);
    const homePage = document.getElementById('home');
    pageHandler(homePage);
};

const navigator = (e, sE) => {
    e.preventDefault();

    navigationHandler(sE.parentElement);
    pageHandler(document.getElementById(sE.classList.value));
};

const innerNavigationHandler = (event, elementName) => {
    event.preventDefault();
    
    const elementToSelect = document.querySelector(`#menu a.${elementName}`).parentElement;
    navigationHandler(elementToSelect);

    const pageToReveal = document.getElementById(elementName);
    const pageToHide = document.getElementById('home');
    pageHandler(pageToReveal, pageToHide);
};

const openUrl = e => {
    e.preventDefault();
    
    const url = e.target.href;
    const win = window.open(url, '_blank');
    win.focus();
};

docReady(() => {
    document.querySelector('.logo_colour').addEventListener('click', goHome);

    document.querySelectorAll('#menu li a').forEach(sE => {
        sE.addEventListener('click', e => navigator(e, sE));
    });

    document.querySelector('.read-more').addEventListener('click', e => innerNavigationHandler(e, 'movie-info'));

    document.querySelector('.option-cast').addEventListener('click', e => innerNavigationHandler(e, 'cast'));

    document.querySelector('.option-imdb').addEventListener('click', openUrl);

    document.querySelector('.option-wikipedia').addEventListener('click', openUrl);
});
