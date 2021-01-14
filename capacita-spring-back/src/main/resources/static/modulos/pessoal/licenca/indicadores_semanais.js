export class IndicadoresSemanais{

    static gerarIndicadoresSorteados(){

        let dataInicial = new Date("2015-01-01");
        let dataFinal = new Date("2023-01-01");
        let valor = 0;
        let maximo = 0;
        let minimo = 0;

        let semanas = [];

        for (let data = dataInicial; data <= dataFinal; data.setDate(data.getDate()+7)){

            valor += (Math.random() < 0.5) ? -1 : 1;
            if (valor < minimo) minimo = valor;
            if (valor > maximo) maximo = valor;

            let dataFinal = new Date(data).setDate(data.getDate()+7);

            semanas.push ({
                inicioSemana: new Date(data),
                fimSemana: new Date(dataFinal),
                valor: valor
            });
        }

        return [semanas, minimo, maximo];
    }
}