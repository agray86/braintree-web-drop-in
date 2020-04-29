var BaseView = require('../base-view');
var DropinError = require('../../lib/dropin-error');
var assign = require('../../lib/assign').assign;
var paymentOptionIDs = require('../../constants').paymentOptionIDs;

function InvoiceView() {
  BaseView.apply(this, arguments);
}

InvoiceView.prototype = Object.create(BaseView.prototype);
InvoiceView.prototype.constructor = InvoiceView;
InvoiceView.ID = InvoiceView.prototype.ID = paymentOptionIDs.invoice;

InvoiceView.isEnabled = function (options) {
    var invoiceConfiguration = options.merchantConfiguration["invoice"];

    return Promise.resolve(invoiceConfiguration && invoiceConfiguration.enabled);
};



InvoiceView.prototype.initialize = function() {
    var self = this;
    var btn = self.getElementById("invoice-button");

    var invoiceConfiguration = this.model.merchantConfiguration["invoice"];

    this.invoiceConfiguration = assign({}, invoiceConfiguration);

    btn.onclick = function() {
        self.model.addPaymentMethod({
            type: 'Invoice'
        });
    };
}

InvoiceView.prototype.requestPaymentMethod = function() {
    return this.model.addPaymentMethod({
        type: 'Invoice'
    });
}

module.exports = InvoiceView;