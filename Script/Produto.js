if (typeof (Script) === "undefined") {
    var Script = {};
}

Script.Produto =
{
    onLoad: function (executionContext) {
        var formContext = executionContext.getFormContext();
        Xrm.Utility.alertDialog("Preencha todos os campos obrigatÃ³rios antes de salvar o produto.");
        this.VisibilidadeGarantia(executionContext);

    },


    onSave: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var eventArgs = executionContext.getEventArgs();

        var campos = [
            "new_nome_produto",
            "new_preco_unitario",
            "new_categoria",
            "new_disponivel_venda"

        ];

        var camposVazios = [];

        campos.forEach(function (campo) {
            var valor = formContext.getAttribute(campo).getValue();
            if (valor === null || valor === "") {
                camposVazios.push(campo);
            }
        });

        if (camposVazios.length > 0) {
            eventArgs.preventDefault();
            Xrm.Utility.alertDialog("Preencha todos os campos obrigatÃ³rios antes de salvar.");

        }




    },

    onChange: function (executionContext) {
        this.VisibilidadeGarantia(executionContext);

    },


    VisibilidadeGarantia: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var categoria = formContext.getAttribute("new_categoria").getValue();

        if (categoria === 1 || categoria === 2) {
            formContext.ui.tabs.get("products").sections.get("secao_garantia").setVisible(true);

        }

        else {
            formContext.ui.tabs.get("products").sections.get("secao_garantia").setVisible(false);
        }
    }

};