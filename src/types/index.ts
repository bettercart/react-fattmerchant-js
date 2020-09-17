declare module '@bettercart/react-fattmerchant-js' {
  interface LineItem {
    id: string
    item: string
    details: string
    quantity: number
    price: number
  }

  interface CustomFields {
    id: string
    name: string
    placeholder: string
    required: boolean
    type: string
    value: string
    visible: string
  }

  interface ExtraMeta {
    reference?: string
    memo?: string
    otherField1?: string
    otherField2?: string
    subtotal?: number
    tax?: number
    lineItems?: LineItem[]
    invoice_merchant_custom_fields?: CustomFields[]
  }

  interface ExtraDetails {
    total?: number
    firstname?: string
    lastname?: string
    month?: string
    year?: string
    phone?: string
    address_1?: string
    address_2?: string
    address_city?: string
    address_state?: string
    address_zip?: string
    address_country?: string
    send_receipt?: boolean
    validate?: boolean
    meta?: ExtraMeta
  }

  interface ChildTransaction {
    auth_id?: string
    created_at: string
    customer_id: string
    id: string
    invoice_id: string
    is_manual: boolean
    is_merchant_present: boolean
    issuer_auth_code?: null
    last_four: string
    message?: null
    meta?: any
    method: string
    payment_method: any
    payment_method_id: string
    receipt_email_at?: string
    receipt_sms_at?: string
    reference_id: string
    source?: string
    success?: boolean
    total: number
    type: string
    updated_at: string
  }

  interface Customer {
    address_1: string
    address_2: string
    address_city: string
    address_country: string
    address_state: string
    address_zip: string
    allow_invoice_credit_card_payments: boolean
    cc_emails?: string
    cc_sms?: string
    company: string
    created_at: string
    deleted_at?: string
    email: string
    firstname: string
    gravatar: false
    id: string
    lastname: string
    notes?: string
    options?: string
    phone: string
    reference: string
    updated_at: string
  }

  interface TokenizeSuccess {
    id: string
  }

  interface TokenizeError {
    message?: string
  }

  interface PaySuccess {
    balance_due: number
    child_transactions: ChildTransaction[]
    created_at: string
    customer: Customer
    customer_id: string
    deleted_at?: string
    due_at?: string
    id: string
    invoice_date_at: string
    is_merchant_present?: string
    is_partial_payment_enabled: boolean
    is_webpayment: boolean
    meta?: ExtraMeta
    paid_at: string
    payment_attempt_failed: boolean
    payment_attempt_message: string
    payment_method_id: string
    schedule_id?: string
    sent_at?: string
    status: string
    total: number
    total_paid: number
    updated_at: string
    url: string
    viewed_at?: string
  }

  interface PayError {
    message?: string
  }

  interface CardFormHandler {
    setTestPan(): any
    setTestCvv(): any
  }

  interface Fattmerchant {
    showCardForm(): Promise<CardFormHandler>
    on(event: string, callback: (message: string) => any): any
    tokenize(extraDetails: ExtraDetails): Promise<TokenizeSuccess | TokenizeError>
    pay(extraDetails: ExtraDetails): Promise<PaySuccess | PayError>
  }

  interface ElementOptions {
    id: string
    placeholder?: string
    style?: string
    type?: string
    format?: string
  }

  interface FattmerchantConstructorOptions {
    number: ElementOptions
    cvv?: ElementOptions
  }

  interface FattmerchantConstructor {
    (paymentsToken: string, options: FattmerchantConstructorOptions): Fattmerchant
  }
}
