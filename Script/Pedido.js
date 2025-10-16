if (typeof (Script) === "undefined") {
    var Script = {};
}

Script.Pedido =
{
    CAMPOS_PEDIDO: [
        "new_pedidodevenda1",
        "new_cliente",
        "new_datadopedido",
        "new_tipodeentrega",
        "new_valortotal",
        "new_enderecodeentrega"
    ],

    onLoad: function (executionContext) {
        var formContext = executionContext.getFormContext();
        this.BloquearCamposSeEntregueOuCancelado(formContext);
    },

    onChange: function (executionContext) {
        this.VisibilidadeEndereco(executionContext);
    },

    onSave: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var eventArgs = executionContext.getEventArgs();

        var cliente = formContext.getAttribute("new_cliente").getValue();

        if (cliente === null) {
            eventArgs.preventDefault();
            Xrm.Utility.alertDialog("O campo Cliente é obrigatório e deve ser preenchido antes de salvar.");
        }
    },

    BloquearCamposSeEntregueOuCancelado: function (formContext) {
        var status = formContext.getAttribute("new_status").getValue();

        if (status === 3 || status === 4) {
            Script.Pedido.CAMPOS_PEDIDO.forEach(function (campo) {
                var control = formContext.getControl(campo);
                if (control) {
                    control.setDisabled(true);
                }
            });
          
            formContext.ui.controls.forEach(function (control) {
                if (control.getName() !== null) {
                    control.setDisabled(true);
                }
            });
        }
    },

    VisibilidadeEndereco: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var tipoEntrega = formContext.getAttribute("new_tipodeentrega").getValue();

      
        var valorEntregaDomicilio = 2;
        var nomeTabulacao = "tab_detalhes"; 
        var nomeSecao = "secao_endereco";  

        if (tipoEntrega === valorEntregaDomicilio) {
            try {
                formContext.ui.tabs.get(nomeTabulacao).sections.get(nomeSecao).setVisible(true);
            } catch (e) {
                console.error("Erro ao tentar mostrar a seção " + nomeSecao + ": " + e);
            }

        } else {
            try {
                formContext.ui.tabs.get(nomeTabulacao).sections.get(nomeSecao).setVisible(false);
            } catch (e) {
                console.error("Erro ao tentar ocultar a seção " + nomeSecao + ": " + e);
            }
        }
    }
};