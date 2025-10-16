if (typeof (Script) === "undefined") {
    var Script = {};
}

Script.Item =
{
    onLoad: function (executionContext) {
        var formContext = executionContext.getFormContext();
        this.PreencherPrecoUnitarioPadrao(formContext);
        this.BloquearQuantidadeInicial(formContext);
    },

    onChange: function (executionContext) {
        this.ControleQuantidade(executionContext);
    },

    onSave: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var eventArgs = executionContext.getEventArgs();

        var quantidade = formContext.getAttribute("new_quantidade").getValue();

        if (quantidade === null || quantidade < 1) {
            eventArgs.preventDefault();
            Xrm.Utility.alertDialog("A Quantidade deve ser preenchida e ser maior ou igual a 1 para salvar.");
        }
    },

    PreencherPrecoUnitarioPadrao: function (formContext) {
        var precoUnitario = formContext.getAttribute("new_precounitario");

        if (precoUnitario) {
            var valor = precoUnitario.getValue();

            if (valor === null || valor === 0) {
                precoUnitario.setValue(10.00);
            }
        }
    },

    ControleQuantidade: function (executionContext) {
        var formContext = executionContext.getFormContext();
        this.BloquearQuantidadeBaseadoNoProduto(formContext);
    },


    BloquearQuantidadeInicial: function (formContext) {
        this.BloquearQuantidadeBaseadoNoProduto(formContext);
    },

    BloquearQuantidadeBaseadoNoProduto: function (formContext) {
        var produto = formContext.getAttribute("new_produto").getValue();
        var controleQuantidade = formContext.getControl("new_quantidade"); 

        if (controleQuantidade) {
            if (produto === null) {
                controleQuantidade.setDisabled(true);
            } else {
                controleQuantidade.setDisabled(false);
            }
        }
    }
};