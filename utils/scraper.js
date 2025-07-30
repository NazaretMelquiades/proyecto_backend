const puppeteer = require("puppeteer");

const fs = require('fs');

const scrap = async (url, title) => {
    try {
        const browser = await puppeteer.launch({
            headless: false,             // Para ver el navegador
            defaultViewport: null,       // Desactiva el tamaño por defecto (800x600)
            args: ['--start-maximized']  // Abre la ventana maximizada
        });
        const page = await browser.newPage();
        await page.goto(url);
        
        //quito el popup de cookies
        await page.waitForSelector('.jad_cmp_paywall_button.jad_cmp_paywall_button-cookies.jad_cmp_paywall_cookies.didomi-components-button.didomi-button.didomi-dismiss-button.didomi-components-button--color.didomi-button-highlight.highlight-button');
        await page.click('.jad_cmp_paywall_button.jad_cmp_paywall_button-cookies.jad_cmp_paywall_cookies.didomi-components-button.didomi-button.didomi-dismiss-button.didomi-components-button--color.didomi-button-highlight.highlight-button');

        // Espera a que cargue la caja de búsqueda
        await page.waitForSelector('#header-search-input');

        // Escribe en la caja de búsqueda
        await page.type('#header-search-input', title);

        // Simula presionar ENTER para buscar
        await page.keyboard.press('Enter');

        // Espera resultados, o redirección
        await page.waitForNavigation();

        //voy a la primera película de los resultados
        await page.waitForSelector('.xXx.meta-title-link');
        await page.click('.xXx.meta-title-link');

        //pincho en el botón de críticas de usuario
        await page.waitForSelector('a[title="Críticas de usuarios"]');
        await page.click('a[title="Críticas de usuarios"]');

        //saco las dos primeras películas y las puntuaciones y reseñas de c/u
        const reviews = await page.$$eval('.hred.review-card.cf', cards => {
            return cards.slice(0, 2).map(card => {
                return {
                    puntuacion: card.querySelector('.stareval-note')?.textContent.trim(),
                    texto: card.querySelector('.review-card-content')?.textContent.trim(),
                };
            });
        });
        console.log(JSON.stringify(reviews, null, 2));

        // cerramos el browser con el método browser.close
        await browser.close()

    } catch (err) {
        console.log("Error:", err);
    }
}


exports.scrap = scrap;

/********** DESCOMENTAR PARA PROBAR *********/
title = 'Titanic';
scrap("https://www.sensacine.com/peliculas/", title).then(data => console.log(data))