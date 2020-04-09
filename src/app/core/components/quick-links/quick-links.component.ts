import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/providers/data/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'vsf-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {

  mode: any = null;
  // for test
  termAndConditions = `TERMS AND CONDITIONS OF THE BEST VOUCHERS WEBSITE
  The binding Terms and Conditions of https://thebestvouchers.com/ website (hereinafter: “Terms and Conditions”).
  
   
  
  1. Rules and definitions
  The Terms and Conditions set out the rules, scope and conditions for the use of https://thebestvouchers.com/website (hereinafter: “Website”). These Terms and Conditions apply to all Website users.
  
  For the purpose of these Terms and Conditions, the definitions provided below shall assume the following meaning:
  
  Seller – the Website Controller, an entity offering the purchase of Vouchers for services presented on the Website, excluding Educational Packages and Access Codes to Educational Packages presented on the Website.
  Buyer – a natural person with full legal capacity and over 18 years of age, who, on the basis of a Sales Contract, purchased a Product from the Seller and received access to an Account on the Website.
  Product – a Voucher for services presented on the Website, excluding Educational Packages and Access Codes to Educational Packages presented on the Website.
  Voucher – an instrument in electronic form, which is sold by the Seller and which, according to the rules included in the Terms and Conditions, entitles the Buyer to redeem it via different Service Providers for products or services offered by them, excluding Educational Packages.
  Access Code – a unique sequence of alphanumeric characters, which is sold by the Seller and which, in accordance with the rules specified in the Terms and Conditions, entitles the Buyer to receive access to the Educational Package offered by the Service Provider.
  Gift – a number of units of a particular cryptocurrency, specified at the moment of purchasing the Access Code to the Educational Package, which each Buyer of the Access Code to the Educational Package receives as a gift. The number of units of a particular cryptocurrency indicated when making an Order shall be added free of charge to each purchased Access Code to the Educational Package, regardless of the value of the Educational Package. The Gift to the Educational Package has no commercial value and cannot be purchased separately. No information presented on the Website shall ever be considered as an offer to purchase the Gift to the Educational Package; the information provided should never be construed as an offer within the meaning of applicable law. The access to the units of a particular cryptocurrency added to the purchased Educational Package in the form of a Gift is enabled by the Access Code, which the User shall receive from the Seller after purchasing the Access Code to the Educational Package; however, the use of the Gift may require the provision of additional data, the submission of documents or other actions to be performed by the Buyer, about which the Seller will inform the Buyer at the time of delivering the Access Code. Each time the Buyer pays to purchase the Access Code to the Educational Package and receives a certain number of units of a particular cryptocurrency, the amount paid is always the fee for the Access Code to the Educational Package, and the units of the particular cryptocurrency included in the package of the Gift to the Access Code are delivered as Gifts.
  Account – an Order account on the Website assigned to a particular Buyer who has concluded a Sales Contract with the Seller by placing an order through the Website or through one of the Seller’s Partners, and the Seller or the Seller’s Partner has confirmed the order. The Account is a subsite of the Website designated for the Buyer, on which information about the purchased Products are displayed, and tools are made available to undertake activities in the scope of redeeming the Vouchers or Access Codes received from the Seller. The Account allows to identify, track and manage the purchased Vouchers or Access Codes. In order to exchange a Voucher or Access Code for products/services offered by a particular Service Provider, please use the hyperlink to the website of the respective Service Provider. The hyperlink is visible to the Buyer after logging into the Account. The account is linked to the Buyer’s email address (Login), and the Password received by the Buyer from the Seller or Seller’s Partner provided on the Voucher or, respectively, the Access Code received from the Seller or Seller’s Partner if the Access Code to the Educational Package was purchased. Additional educational materials, excluding online training courses offered as part of the Educational Package by the Service Provider, may be made available to the Buyer by the Seller in the form of text files to be downloaded directly after logging into the Account.
  Payment Provider – payments for Vouchers or Access Codes may be processed by third parties providing services in the scope of data processing and payments, invoicing of amounts due, reconciliation of balances and reporting;
  Educational package – online training (Webinar); a type of webinar conducted and implemented with the use of webcast technology, which enables two-way communication between the meeting leader and participants, with the use of virtual tools.
  Partner – an entity participating in the Seller’s partner program, to which the Seller commissioned operational marketing activities aimed at bringing potential customers (Buyers) to the Seller’s website (Website).
  Website – the website https://thebestvouchers.com/, maintained by the Website Controller, through which the Buyer may place an Order or redeem a Voucher or Access Code,
  Sales Contract – a contract whose subject matter is the purchase of a Product, concluded between the Seller and the Buyer in the manner specified in these Terms and Conditions,
  Service Provider – a third party offering Educational Packages, the use of which is enabled by the Access Code received from the Seller, and other services presented on the Website, the use of which is enabled by the Voucher received from the Seller;
  Order – the Buyer’s declaration of will placed by means of an Order Form available on the Website or on the website of one of the Seller’s Partners, with its direct aim to conclude a Sales Contract with the Seller. The Order is treated as an offer to purchase a Voucher or Access Code submitted to the Seller by the Buyer. For an effective conclusion of the contract, the Seller is required to confirm the acceptance of the Order.
  2. General terms of use of the Website
  Products may be purchased only by individual Buyers.
  The Buyers are obliged to comply with these Terms and Conditions, and are required to use the Website in a manner consistent with the applicable law and in accordance with the principles of social coexistence.
  All commercial information, price lists and advertisements on the Website are merely an invitation for the Buyers to make offers and conclude agreements for Purchase. No information presented on the Website, regardless of its name, should be construed as an offer within the meaning of the applicable law.
  The Buyer placing an Order must be at least 18 years of age and have full legal capacity or hold a consent from his or her legal guardian, in accordance with the statutory laws applicable in the current location of the Buyer.
  Any Orders for Products placed by the Buyer shall be deemed to be an offer and shall only be deemed accepted by the Seller upon the earlier of acceptance of the Order by the Seller in accordance with the provisions specified in the Terms and Conditions. The Seller expressly reserves the right to reject any offer and/or refuse to accept an Order without providing justification. In addition, even if the Seller has initially accepted the Buyer’s offer, the Seller can cancel the transaction at any time if it reasonably suspects that the Buyer has committed fraud against the Seller, Service Provider or the Seller’s Partner.
  The Seller reserves the right to cancel an Order if the Buyer’s behaviour is seen to be suspicious or potentially fraudulent.
  The Seller reserves the right to discontinue the sale of Vouchers and Access Codes at any time or to modify the Terms and Conditions.
  Purchases are made for personal use only.
  The Buyer has no right to make copies of the Access Codes or Vouchers in any way or to enable such actions to others.
  The Buyer promises not to provide false data including false names, addresses and/or contact or payment details; or engage in any unlawful activity in connection with the Purchase or use of the Access Codes or Vouchers, or allow anyone else to do so. The Seller shall not be held liable if the data is entered incorrectly and someone other than the intended recipient uses the Access Code to the Educational Package or the Voucher.
  The Buyer agrees to update the data whenever they change. The Seller shall not be held liable for any consequences resulting from a failure to fulfil this obligation.
  In the cases referred to in sec. 2 point 10 and sec. 2 point 11, the Buyer’s access to their Account may be blocked by the Website Controller.
  All the prices are quoted in a particular currency and include all taxes applicable to the country of the Seller’s registered office. If an additional tax obligation applies in the country of residence of the Buyer, the Buyer shall be responsible for the collection, deduction, declaration and payment of additional taxes to the appropriate tax authorities.
  Current information about the prices of Vouchers and Access Codes is valid from the day it is displayed on the Website. The prices include delivery costs.
  After the purchase of the first Voucher or Access Code, an individual Buyer’s Account shall be created on the Website, the access to which shall be possible by means of the password provided on the Voucher, or the Access Code provided on the card with the Access Code, received after placing an Order, and an email address.
  Each Buyer can hold only one Account.
  In order to register a Buyer’s Account, the following data are required: email address and the Password provided on the Voucher or the Access Code provided on the card with the Access Code, which the Buyer is obliged to keep in confidence.
  The Buyers’ personal data is collected exclusively on a voluntary basis and used only in accordance with the provisions of the Privacy Policy.
  Unless otherwise agreed, the Seller can change the specification of the Products. In particular, without limitation, the identity and number of Service Providers through which it is possible to use Educational Packages using Access Codes or other services using Vouchers, may change, which the Buyer expressly confirms and accepts.
  As it is impossible to purchase Access Codes and Vouchers by individuals who reside in certain countries, Orders made from the territory of the following countries and with the delivery address within these countries shall not be processed: e.g. Afghanistan, Bangladesh, Democratic Republic of the Congo, Republic of Equatorial Guinea, Guyana, Hong Kong, Iraq, Laos, Mauritania, Moldavia, Niger, North Korea, Sierra Leone, Singapore, Syria, Western Sahara, Yemen, and Zimbabwe.
  The personal data provided at the moment of Registration and placing an Order shall be processed by the Controller/Payment Operator to the extent necessary to complete the Order, including online and offline settlements and after-sales services, and to the extent necessary to assign Access Codes and use Educational Packages with their use or similarly Vouchers, and redeem them for specific services offered by the Service Providers.
  All Products presented on the Website, and other names and logos presented on the Website are used solely for identification purposes and can constitute a trademark protected by law.
  The Website and the content of the Website are subject to full protection in regard to copyrights or other intellectual property rights and must not be used for purposes other than those expressly permitted in these Terms and Conditions – in particular, they must not be copied, either in whole or in part.
  3. Sales Contract conclusion
  The conclusion of the Sales Contract takes place as a result of the Buyer placing an Order by means of an Order Form on the Website or on one of the websites of the Seller’s Partners, at the moment of the acceptance of the Order by the Seller.
  Orders are accepted 24 hours per day, 365 days per year. Orders can be placed online from anywhere in the world, subject to sec. 2 point 20; however, in some countries it is only possible to make a prepayment through the payment system indicated on the Website.
  The Buyer shall specify the following details in the Order Form:
  - Full name of the Buyer,
  
  - Telephone number of the Buyer,
  
  - Email address of the Buyer to which the Account on the Website will be assigned.
  
  By completing the Order Form, the Buyer:
  
  - confirms the authenticity and accuracy of the data contained in the Form mentioned above,
  
  - expresses consent to the provisions of these Terms and Conditions, recognising their binding character,
  
  - agrees to the processing of personal data contained therein for the purpose of offering products and services by the Seller directly to the Buyer (direct marketing).
  
  After receiving the Order Form, the Seller shall contact the Buyer by phone in order to determine the detailed parameters of the Order – i.e. the type of Voucher or Access Code to be delivered to the Buyer, its value and the Buyer’s address to which the Order is to be sent, to which the Buyer agrees.
  After the aforementioned arrangements are made between the Buyer and the Seller, the Seller shall send the Buyer a confirmation of the acceptance of the Order to the email address indicated by the Buyer.
  Order value – this is the amount specified in the confirmation of the acceptance of the Order, which is the price of the Voucher or Access Code selected by the Buyer. The value of the Order is tantamount to the total amount that the Buyer has agreed to pay. During a telephone conversation between the Seller and the Buyer, the Seller may, due to the size of the Order, offer the Buyer a promotional price. In such an event, the price agreed between the parties during this conversation shall remain binding for the Buyer.
  The Order shall be deemed accepted for processing at the moment of sending the confirmation of the acceptance of the Order by the Seller to the Buyer.
  If the Buyer has not completed the Order placement process, the Seller’s Customer Service Department shall contact the Buyer using the data provided during the Order placement process, in order to confirm the receipt of the Order, which the Buyer agrees to. The confirmation mentioned above shall be tantamount to placing an Order by the Buyer, in accordance with the conditions specified in these Terms and Conditions. The Purchase is not complete until the Buyer receives an email confirming the acceptance of the Buyer’s offer by the Seller.
  If a Purchase is made, a Voucher or card with an Access Code shall be immediately sent to the Buyer by courier or post. Payments may be recorded and processed by different Payment providers or by postal services/courier companies, if payment on delivery is selected.
  There is no limit on the Purchase of Access Codes and Vouchers per household or per Buyer unless expressly specified otherwise on the Website or in the Terms and Conditions. The Seller reserves the right to discontinue the sale of Access Codes and Vouchers at any time or to modify the provisions of the Terms and Conditions.
  4. Requirements for the use of a Voucher or Access Code
  In order to use a Voucher or Access Code by logging into the Account, it is necessary to use computer equipment that meets the following technical conditions: computer with an Internet connection (min. 512 kb/s), graphical web browser which supports JavaScript (e.g. Google Chrome, Internet Explorer, Mozilla FireFox, Opera) and cookies, installed software to read PDF files (e.g. Adobe Reader, Foxit Reader).
  The Seller shall not be liable for the incorrect configuration of the Buyer’s computer.
  The Seller shall not be liable for cases where the Buyer fails to redeem the Voucher or Access Code due to technical problems of the Buyer’s computer.
  In order to use the Voucher or Access Code, it is necessary to log in to the Account using login data, i.e. Login (email address provided in the Order Form by the Buyer) and Password (the password provided on the Voucher supplied by the Seller) or Access Code (provided by the Seller on the card with the Access Code in the event of purchasing the Access Code to the Educational Package). When first logging into the Account using the data provided by the Seller, the Buyer shall be entitled to change the Password or Access Code.
  The Account allows to identify, track and manage the purchased Vouchers or Access Codes. In order to exchange a Voucher or Access Code for services offered by a particular Service Provider, the hyperlink to the website of the respective Service Provider should be used.
  Additional information concerning the way of logging into the Website (Login Instruction) shall be sent by the Seller to the Buyer’s email address immediately after the payment is made by the Buyer.
  5. Delivery of Vouchers and Access Codes
  Vouchers and cards with Access Codes shall be delivered to the Buyer by post or courier to the address indicated by the Buyer.
  The ownership of the Voucher or Access Code shall pass to the Buyer only upon the receipt of payment by the Seller for the Access Code or Voucher which was made by the Buyer.
  If payment is not received (e.g. a cheque bounces, credit card payments are refused, or the Order remains unpaid at the due date) any Access Codes or Vouchers dispatched shall become void and may not be used.
  If an Access Code or Voucher delivered by post is lost, stolen or destroyed before it is used, the Seller shall deactivate the previous Access Code or Voucher by assigning a new Access Code or Voucher to the Buyer for which the same rules shall apply.
  6. Use of Access Codes and Vouchers
  Unless otherwise stated in the terms of use of Educational Packages or services which the Voucher entitles to purchase, only individual Buyers may use Educational Packages as well as the above mentioned services.
  Educational Packages purchased with the use of Access Codes and services purchased with the use of Vouchers are not refundable in cash.
  An Access Code or Voucher can only be used once. Neither the Access Code nor the Voucher can be used partially.
  Expiry date of Access Codes.
  Each Access Code is valid for six months from the date of delivery of the Access Code. The expiry date of the Access Code means the time during which such code must be activated and the Educational Package used. After this period, the Access Code and use of the Educational Package is not possible. The provisions above also apply to the Free Education Package.
  
  The Seller does not make or give any promises, warranties, guarantees or representations concerning Educational Packages or other services provided by Service Providers.
  Access Codes and Vouchers shall be subject to verification at the time of their use in order to use the Educational Package or services that the Voucher entitles the Buyer to purchase.
  7. Liability
  The Seller is not a party to the agreement for the purchase of Educational Packages or other services, but only offers the purchase of Access Codes to Educational Packages and Vouchers entitling to purchase the services presented on the Website, and therefore shall not be liable for the quality, safety or legality of the services purchased using the Access Codes or Vouchers, or for the genuineness and thoroughness of information of information provided in the advertisement, the Service Providers’ capability or right to sell particular services and the solvency of the Buyers placing Orders.
  The Payment Provider is not a party to the agreement concluded between the Buyers and Service Providers and shall not be held liable for improper performance or non-performance of contracts concluded by the Buyers.
  Neither the Website Controller/Seller, nor the Operator and the Payment Operator shall be liable for special, indirect or consequential losses incurred during the use of the services purchased using the Access Codes and Vouchers, as well as Gifts.
  The Seller shall not be liable for the violation of these Terms and Conditions, if the fulfilment of a particular obligation has become impossible due to reasons beyond its control.
  The Controller provides the Website “as is”, “with all faults” and “as available”. The Seller and its suppliers do not give express warranties or guarantees regarding the Website, Access Codes, Vouchers, Gifts, or any services.
  To the maximum extent permitted by law, the Seller and its employees, directors, agents, and vendors do not guarantee that Educational Packages or any other services offered by Service Providers are merchantable, of satisfactory quality, accurate, timely, fit for a particular purpose or need, compliant with law, suitable for use or provided with due diligence and abilities. The Seller does not guarantee that the services/products purchased with the use of Access Codes or Vouchers shall meet the requirements of the Buyers, shall be free of errors, useful, complete or available at all times. The Seller does not guarantee that the advantages which can be obtained in connection with the use of the Website will be effective, reliable and accurate and that they will meet the expectations of the Buyers. The Seller gives no guarantees with respect to the protection of privacy and security other than those expressly set out in the Privacy Policy. The Seller does not guarantee that the Buyers will be able to access or use the Website at any chosen time and location. No oral or written information or advice given by its representative shall constitute a guarantee. The Buyer may have additional consumer rights under the Buyer’s local laws that these Terms and Conditions cannot change.
  8. Indemnity
  By accepting these Terms and Conditions, the Buyer agrees to indemnify and hold harmless, in so far as permitted by law, the Seller/Controller, its directors, employees and agents from liability for any claims, damages, liabilities, losses, amounts due, costs or debt and expenses (including, without limitation, for any reasonable charges incurred in relation to any claims or court proceedings which have been instituted or which the Seller/Controller can be at risk of in relation to any parties) resulting from respectively: the use by the Buyer of access to the Website, Access Code or Voucher; the breach of any provision of these Terms and Conditions; the violation of any rights of third parties, including without limitation any copyright, property or privacy right; and any claim that the content provided by the Buyer causes damage to a third party.
  The obligation to indemnify and hold harmless referred to in sec. 9 point 1 above remains in force after the expiry of these Terms and Conditions and after the Buyer stops using the Website.
  9. Personal data protection
  The controller of the databases containing the personal data provided by Website users (Buyers) is the Seller.
  The controller of databases containing personal data undertakes to protect personal data in accordance with the law applicable to the registered office of the Seller. When the Buyers provide the personal data Controller with their personal data, the Buyers shall simultaneously consent to their processing by the personal data Controller for the purpose of processing the Orders made. The Buyers shall be entitled to view, correct, update and delete their personal data.
  10. Changes made to offers and promotions
  The Seller reserves the right to change the prices of the Products included in the offer, withdraw some Products from the offer and introduce new Products and promotional campaigns.
  The entitlement described in point 1) above shall not affect Orders placed before any changes were introduced to the prices and promotional campaign conditions, and they shall be implemented based on the previous conditions.
  11. Complaints
  If in the opinion of the Buyer, the services provided on the basis of the Terms and Conditions are not carried out or are carried out in breach of the provisions of the Terms and Conditions, the Buyer shall be entitled to submit a complaint to warranty@thebestvouchers.com
  The complaints received by the Seller shall be considered within 14 days from their receipt to the email address specified in point 1) above. If the Complaint does not include information necessary for its consideration, the Seller shall request the person submitting the Complaint to provide the necessary information, and the term of 14 days shall then run from the day on which the correctly completed Complaint is received.
  The complaint should include at least the Buyer’s full name, the Buyer’s email address, a description of any objections raised and an indication of the proposed method of resolving the Complaint.
  A response to a Complaint shall be sent to the email address specified by the Buyer in the Order. In justified cases, the Seller may send a response to another email address specified by the person submitting the Complaint which is not assigned to the Order.
  Should it be impossible to identify the User, the complaint will be left unconsidered.
  The Seller shall not be liable for any damage not caused by the Seller’s fault.
  If, in the event when the Access Code or Voucher is redeemed, the Buyer has reservations about the Educational Packages or services purchased with the use of the Voucher, any claims in this respect shall be addressed directly to the Service Provider. This is due to the fact that the Controller/Seller only sells Vouchers and Access Codes and makes the Website available, and it is the Service Provider, not the Controller/Seller responsible for Educational Packages, the use of which is made possible by the Access Code received from the Seller and the services, which the Voucher enables. However, should the Buyer and the Service Provider fail to reach an agreement, the Controller/Seller may, at the request of the Buyer, help to solve the dispute.
  The Controller/Seller may cancel or refuse to issue a specific Access Code or Voucher at any time as a result of errors linked to the issuance or processing of the Access Codes or Vouchers or if the Controller/Seller states that the Buyer has requested the issuance of the Access Code or Voucher or used the Access Code or Voucher incorrectly, in a manner inconsistent with its intended purpose, in breach of these Terms and Conditions, or because the Access Code or Voucher has been falsified or changed.
  The Buyer may submit a complaint on the functioning of the Website to the Website Controller, and if the sale process of Access Codes or Vouchers is operating incorrectly, the Buyer may submit a complaint to the Seller.
  12. Withdrawal from the Contract
  The Buyer who did not use the Voucher or Access Code shall be entitled to withdraw from the Contract within 14 days from its conclusion date and receive the full refund of costs.
  The Buyer who used the Voucher or Access Code loses the right to withdraw from the Contract.
  The Buyer may withdraw from the Contract by sending an email confirming their wish to withdraw from the Contract to: warranty@thebestvouchers.com
  It is impossible to withdraw from the Access Code or Voucher Sales Contract in relation to an Access Code or Voucher which has already been used. The use of an Access Code or Voucher shall be understood to mean the use by the Buyer of the received Access Code or Voucher enabling the use of the Educational Package, other services offered by Service Providers or the use of the Gift.
  13. Final provisions
  The Website Controller shall make every effort to ensure the correct functioning of the Website.
  The Website Controller reserves the right to deactivate the Website, in whole or in part, for an unlimited time in order to modernise or repair it.
   
  
  The Website Controller and the Seller shall not be liable for difficulties in Order processing which are caused by random events outside the scope of their influence (including those dependent on the Buyer, third parties or force majeure).
   
  
  The Seller reserves the right to make changes to the Terms and Conditions without providing a reason.
  The Buyers registered in the Website shall be notified about the changes to the Terms and Conditions and their scope by electronic means (with an email sent to the email address provided when placing an order) or in the form of a pop-up window when first logging into the Website after the changes were made. Changes shall be introduced to adapt the Terms and Conditions to the legal framework in force.
  If any provisions of these Terms and Conditions are deemed invalid or ineffective, this shall not affect the validity and enforceability of the remaining provisions hereof. Such an invalid or ineffective provision shall be replaced with a valid and effective one that resembles as close as possible the economic effect which the invalid or ineffective provision had referred to.
  The Buyer shall be required to become acquainted with the changes to the Terms and Conditions if the Buyer uses the Website in any way.
  The current version of the Terms and Conditions is always available at www.thebestvouchers.com.
  The appropriate provisions of law applicable to the registered office of the Seller shall be in force in any matters not governed by these Terms and Conditions. Any disputes shall be resolved in an amicable manner if the Buyer so requests. As a last resort, disputes shall be settled by a common court of competent jurisdiction according to the registered office of the Seller.
  Using the Website by the Buyer is tantamount to becoming acquainted with and accepting the provisions of these Terms and Conditions.
   
  
  The date of the last revision of these Terms and Conditions: 13/03/2019
  
    
  
  Place, date
  
  Sender
  Name and surname of the Buyer
  Address of residence
  
  Declaration delivery address:
  
  Declaration of withdrawing from a remote contract
  
  I declare that I withdraw from the sales contract relating to the Access Code/Voucher number .......................... (order identification number) concluded by confirming the Order, which took place on ..................................; the Access Code/Voucher was received on ...............................
  
  Please return the amount of .................... (in words: …………………………………………………)
  to the bank account number ………………………………………………………………, SWIFT/BIC: ………………….
  I hereby return ………………………………………………… (the Gift to the Access Code to the Educational Package – if applies) in unchanged condition.
  
  The Buyer's signature`

  privacyPolicy = `Privacy Policy of The Best Vouchers Website
  This Privacy Policy sets out rules for the collection, processing and protection of the data provided by Users in connection with the use of the Website, involving both the use of cookies on the User’s computer, collecting and processing of user data for statistical purposes, as well as other methods of data processing, in particular the collection, consolidation, storage, elaboration, modification, sharing, and other use of the data. All the definitions used in this Privacy Policy shall have the meaning given to them in the Terms and Conditions of The Best Vouchers Website available at www.thebestvouchers.com.
  
  Article 1
  Personal Data Controller
  The Data Controller collects personal data to enable the Buyers to use the Website.
  The Buyers’ personal data are subject to special protection and are used only for the purpose specified in the consent. The personal data database is maintained by the Data Controller, in accordance with the provisions of law applicable to the registered office of the Data Controller and the principles of social coexistence.
  The Data Controller’s tasks include:
  supervising the security of the personal data made available to the Data Controller by the Buyers, in particular, to prevent the access of unauthorised persons;
  providing the registered Buyers with the opportunity to use their rights, in particular, the right to access one’s own personal data, as well as the right to update or erase one’s own personal data.
  Article 2
  Personal data and other information provided by the Buyers
  The Buyers provide their personal data on a voluntary basis; however, the provision of some data is necessary for the use of the Website, and it is impossible to use the Website if this data is not provided.
  All personal data collected is intended for use by the Data Controller.
  When using the Website, servers automatically collect information sent by the browser and those contained in system logs. This information may include a variety of data, such as: email address, IP address, browser type, the website visited immediately prior to visiting the Website, the time of accessing the Website, and other statistics. The Data Controller uses this data to ensure the highest quality of service, as well as for technical and statistical purposes.
  The collected data is used to identify the Buyers in order to process Orders, including to deliver Products and Gifts, as well as to perform online and offline billing, in particular in relation to credit card or debit card details or other financial data necessary to process payments made by the Buyers (payment servicing and Order processing), for subsequent contact with the Buyers and in order to develop the Website and after-sales services. This data includes information such as: full name, address, telephone number, email address, user name (login), individual access password, transaction history and any personal information provided by the Buyers themselves.
  The Data Controller may collect information relating to technical data, in particular, the URL address, type of equipment used by the Buyers to use the Website, equipment ID, type of network connection and the name of the service provider.
  Due to the character of the Orders, as well as the Products and Gifts supplied by means of the Website, the Buyer may be asked to provide additional personal information. The scope of any additional data shall be appropriately indicated in the Terms and Conditions of The Best Vouchers Website.
  Article 3
  Processing of personal data
  The Data Controller collects, uses, makes available and processes the personal data of the Buyers for the purpose of Order processing, delivery and shipment of Access Codes and Vouchers, Gifts/exchange of Access Codes and Vouchers for the services of individual Service Providers, marketing of own services and that of third parties, and for the purpose of sending the Buyers newsletters and other promotional and advertising materials. At any time, the Buyers may stipulate that they do not agree to receiving commercial information – by clicking the link provided at the end of a message.
  The rights of every Buyer are guaranteed by the relevant act on the protection of personal data. In order to access, update or erase own personal data, the Buyer should contact the customer service department using the contact form available on the Website.
  The Website can use, i.a. Google Analytics (and similar systems), i.e. a web analytics service and application provided by Google, Inc. (“Google”) or other entities. Google Analytics uses "cookies". Google may transfer the identified information to third parties only if it is required to do so by law.
  The Data Controller uses “cookies” to store information about the preferences of the Buyers. These are text files stored on the Buyer’s devices, identifying them for the purpose of performing certain operations. These files contain: personal settings of the Buyer and an option to automatically complete fields in forms, used among others to store data necessary for the Buyer to log in. In particular, two categories of cookies are used:
  Action Cookies – files saved to record the activity of the Buyers on the Website. These files provide statistical data used to optimise the functionality of the Website. Cookies only become active upon their acceptance by the User through the appropriate setting in their browser.
  Session Cookies – used in websites which provide the log in option – the files are saved to define the login status of the Buyer. Their purpose is to provide the Buyers with access to sites visible only to the Buyers using the Website. Session cookies are assigned in the Buyer login process and are removed when the Buyer is logging out, i.e. when clicking the “Log out” button.
  Each Buyer may withdraw their consent to the processing and storage of their personal data at any time by contacting customer service by means of the contact form available on the Website.
  Prevention of all forms of identity theft, phishing and other fraudulent practices is one of the highest priorities of the Data Controller. For this purpose, any information provided by the Buyers, in particular data such as credit card numbers or details submitted on the Website offering the option to log in and enter a password to access the Buyer’s account, is collected in a secure way.
  Article 4
  Content and messages of Users
  Using its servers which ensure complete security, the Data Controller stores: data sent by the Buyers, in particular, messages sent by the Buyers in all sections of the Website and information linked to financial transactions related to the Purchase of Access Codes and Vouchers.
  Article 5
  Entrusting or making available of personal data of Users to other entities
  The Buyers hereby give their consent for the Data Controller to convey their personal data, for reasons specified in Article 3 point 1, to the Data Controller’s subsidiaries and affiliates, and to the Data Controller's business partners and Service Providers.
  The personal data of Buyers shall be transferred to other entities for the purpose of data centralisation or for logistical purposes, where this is required by law, or in the event of acquisitions or mergers linked to the Data Controller.
  Article 6
  Final provisions
  The Data Controller reserves the right to send the Buyers unsolicited messages. This includes information relating directly to the functioning of the Website (e.g. changes to its functionality) or non-commercial messages (e.g. greetings, system notifications). All Buyers have the right to stipulate that they do not wish to receive such information, by clicking the link provided at the bottom of the message.
  The Website may contain links (e.g. in the form of third-party logos) which will redirect the person browsing the Website to an external website. The use of such redirections must not be identified with any kind of connection between the Data Controller and the entity to which the external website belongs. In no event is the Data Controller liable for the consequences of this kind of redirection, nor do they have any influence on the content of those external websites. The Data Controller is not responsible for the content of the privacy and security policies of those websites, or for the cookie files used in the process of browsing them. We encourage those using such links to familiarise themselves with the content of relevant documents applicable on the respective websites.
  The Data Controller reserves the right to introduce changes or amendments to this Privacy Policy. Changes are made by posting new content of the Terms and Conditions on the Website. Changes become effective at the time of their introduction.
  The precondition for the use of the Website is the acceptance of this Privacy Policy.`;


  listLocation = [
    {
      loc: 'Български',
      email: 'contact.bg@thebestvouchers.com'
    },
    {
      loc: 'Français',
      email: 'contact.fr@thebestvouchers.com'
    },
    {
      loc: 'Hrvatski',
      email: 'contact.hr@thebestvouchers.com'
    },
    {
      loc: 'Magyar',
      email: 'contact.hu@thebestvouchers.com'
    },
    {
      loc: 'Český',
      email: 'contact.cz@thebestvouchers.com'
    },
    {
      loc: 'Polska',
      email: 'contact.pl@thebestvouchers.comm'
    },
    {
      loc: 'Latviešu',
      email: 'contact.lv@thebestvouchers.com'
    },
    {
      loc: 'Português',
      email: 'contact.pt@thebestvouchers.com'
    },
    {
      loc: 'Ελληνικά',
      email: 'contact.gr@thebestvouchers.com'
    },
    {
      loc: 'Italiano',
      email: 'contact.it@thebestvouchers.com'
    },
    {
      loc: 'Română',
      email: 'contact.ro@thebestvouchers.com'
    },
    {
      loc: 'Slovenský',
      email: 'contact.sk@thebestvouchers.com'
    },
    {
      loc: 'Slovenščina',
      email: 'contact.sl@thebestvouchers.com'
    },
    {
      loc: 'Lietuvių',
      email: 'contact.lt@thebestvouchers.com'
    },
    {
      loc: 'Español',
      email: 'contact.es@thebestvouchers.com'
    },
    {
      loc: 'English',
      email: 'contact.en@thebestvouchers.com'
    },
    {
      loc: 'Turkish',
      email: 'contact.tr@thebestvouchers.com'
    },
    {
      loc: 'Eesti',
      email: 'contact.ee@thebestvouchers.com'
    },
    {
      loc: 'Deutsch',
      email: 'contact.de@thebestvouchers.com'
    },
    {
      loc: 'Indonesia',
      email: 'contact.id@thebestvouchers.com'
    },
  ]

  subscruption:any = null;

  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) {

    const url = this.router.url;
    // location.replaceState(url);
    if(url) {
      switch(url){
        case '/check-your-order': this.mode = 'check'
          break;
        case '/terms-and-services': this.mode = 'term'
          break;
        case '/privacy-policy': this.mode = 'private'
          break;
        case '/return-policy': this.mode = 'return'
          break;
        case '/delivery': this.mode = 'delivery'
          break;
        case '/contact': this.mode = 'contact'
          break;
        default: this.mode = null;
          break;
      }
    }
  }

  ngOnInit(): void {

  }
}
