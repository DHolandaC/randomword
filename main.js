window.addEventListener("load", e => {
    mostrandoLimite = false;
    limiteAtivo = false;
    numMax = 0;
    numMin = 0;

    const gerarPalavra = () => {
        document.getElementById("h1Palavra").classList.remove("h1PalavraAnim");
        fetch(
            "dicionario.txt"
        )
            .then(response => response.text())
            .then(palavras => {
                const arrayPalavras = palavras.split("\n");
                let nAleatorio = Math.floor(Math.random() * 261798);
                if (limiteAtivo) {
                    while ((arrayPalavras[nAleatorio].length - 1) > numMax || (arrayPalavras[nAleatorio].length - 1) < numMin) {
                        nAleatorio = Math.floor(Math.random() * 261798);
                    }
                }
                document.getElementById("h1Palavra").textContent = arrayPalavras[nAleatorio];
                document.getElementById("h1Palavra").classList.add("h1PalavraAnim");
                document.getElementById("pLetras").textContent = (arrayPalavras[nAleatorio].length - 1) + " letras";
            });
    }

    gerarPalavra();

    document.getElementById("buttonGerar").addEventListener("click", e => {
        gerarPalavra();
    });

    document.getElementById("maisOp").addEventListener("click", e => {
        if (!mostrandoLimite) {
            document.getElementById("divLimita").style.visibility = "visible";
            document.getElementById("divLimita").classList.add("divLimitaAnim")
            document.getElementById("maisOp").textContent = "-";
            mostrandoLimite = true;
        }
        else {
            document.getElementById("divLimita").style.visibility = "hidden";
            document.getElementById("divLimita").classList.remove("divLimitaAnim")
            document.getElementById("maisOp").textContent = "+";
            mostrandoLimite = false;
        }
    });

    const confirmaLimite = () => {
        const limite = document.getElementById("inputLimite").value;
        const posMeio = limite.split("").indexOf('-');
        const limiteMin = Number(limite.split("").slice(0,posMeio).join(""));
        const limiteMax = Number(limite.split("").slice(posMeio + 1).join(""));
        console.log(`Mínimo de ${limiteMin} letras e máximo de ${limiteMax} letras`);

        if (limite != "") {
            if (limite.split("").includes('-') && (limiteMin > 0 && limiteMin <= limiteMax) && (limiteMax < 24 && limiteMax >= limiteMin)) {
                console.log("Limite ativo");
                limiteAtivo = true;
                numMax = limiteMax;
                numMin = limiteMin;
            }
            else {
                alert("Limite indisponível, tente outro!")
                console.log("Limite indisponível, tente outro!")
                document.getElementById("inputLimite").value = "";
            }
        }
        else {
            console.log("Limite desativado");
            limiteAtivo = false;
        }

        document.getElementById("divLimita").style.visibility = "hidden";
        document.getElementById("divLimita").classList.remove("divLimitaAnim")
        document.getElementById("maisOp").textContent = "+";
        mostrandoLimite = false;
    }

    document.getElementById("confirma").addEventListener("click", e => {
        confirmaLimite();
    });

    document.addEventListener("keypress", e => {
        if (e.charCode == 13 && mostrandoLimite) {
            confirmaLimite();
        }
    });

    document.getElementById("limpa").addEventListener("click", e => {
        document.getElementById("inputLimite").value = "";
    });
});