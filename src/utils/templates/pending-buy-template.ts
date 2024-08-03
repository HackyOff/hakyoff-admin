import { DateUtils } from "../dateutils";
import { NumberUtils } from "../number-utils";

export const trainingBuyTemplate = (name: string, courseTitle: string, price: number ) => `
  
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
 <head> 
  <title></title> 
  <!--[if !mso]><!--> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
  <!--<![endif]--> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
  <style type="text/css">
      #outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }
    </style> 
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]--> 
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]--> 
  <!--[if !mso]><!--> 
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css" /> 
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,700,700i,900,900i|Roboto:100,100i,200,200i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap" rel="stylesheet" type="text/css" /> 
  <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Noto+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,700,700i,900,900i|Roboto:100,100i,200,200i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap);
        </style> 
  <!--<![endif]--> 
  <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
.mj-column-per-50 { width:50% !important; max-width: 50%; }
      }
    </style> 
  <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
.moz-text-html .mj-column-per-50 { width:50% !important; max-width: 50%; }
    </style> 
  <style type="text/css">
    
    

    @media only screen and (max-width:479px) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }
  
    </style> 
  <style type="text/css">
    @media only screen and (max-width:480px) {@viewport { width:480px; } img{height: auto !important;}  }  img {border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;} .eb-image-full-width,.eb-image-full-width table,.eb-image-full-width td,eb-image-full-width img{width:100% !important} .eb-image img{max-width: 100%;height:auto;box-sizing: border-box;} .eb-button,.eb-button a{word-break:break-word;}  .eb-button.eb-btn-full-width table{width: 100% !important;max-width: 100%;box-sizing: border-box;} .eb-button.eb-btn-full-width a{width: 100% !important;max-width: 100%;box-sizing: border-box;}  .eb-text p{margin:0;word-break: break-word;}
    </style> 
  <!-- [if mso | IE]><style type="text/css">.eb-divider p{border-top:0px solid transparent !important;}</style><![endif]--> 
 </head> 
 <body style="font-family: 'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif; word-spacing: normal; background-color: #f9f9f9;" class=" eb-drag-and-drop-builder"> 
  <div style="background:#f9f9f9;background-color:#f9f9f9;"> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
    <tbody> 
     <tr> 
      <td> 
       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
       <div style="margin:0px auto;max-width:600px;"> 
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
         <tbody> 
          <tr> 
           <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="eb-section-outlook mjml-section-undefined-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="eb-section-outlook mjml-section-undefined-outlook" role="presentation" style="width:600px;" width="600" bgcolor="transparent" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
            <div class="eb-section mjml-section-undefined" style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;"> 
             <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;"> 
              <tbody> 
               <tr> 
                <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:600px;" ><![endif]--> 
                 <div class="mj-column-per-100 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td class="mjml-content-e8a96e86-3572-c1a6-57e9-dc63668febe6" style="background:transparent;font-size:0px;word-break:break-word;"> 
                          <div style="height:50px;line-height:50px;">
                            
                          </div> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
               </tr> 
              </tbody> 
             </table> 
            </div> 
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--> </td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
     </tr> 
    </tbody> 
   </table> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
    <tbody> 
     <tr> 
      <td> 
       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
       <div style="margin:0px auto;max-width:600px;"> 
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
         <tbody> 
          <tr> 
           <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="eb-section-outlook eb-template-first-section-outlook mjml-section-eb_cc0a2f87-5a6a-424e-a8b4-c6986f8b3585-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="eb-section-outlook eb-template-first-section-outlook mjml-section-eb_cc0a2f87-5a6a-424e-a8b4-c6986f8b3585-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
            <div class="eb-section eb-template-first-section mjml-section-eb_cc0a2f87-5a6a-424e-a8b4-c6986f8b3585" style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;"> 
             <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"> 
              <tbody> 
               <tr> 
                <td style="direction:ltr;font-size:0px;padding:10px 10px 10px 10px;text-align:center;"> 
                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:580px;" ><![endif]--> 
                 <div class="mj-column-per-100 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px 0px 0px 0px ;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td align="center" class="mjml-content-eb_4a4aa207-4129-4c14-b4a3-4c86e86fa2ec max-width-100 eb-image" style="background:transparent;font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"> 
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> 
                           <tbody> 
                            <tr> 
                             <td style="width:150px;"> <img alt="" src="https://dashboardassets.eb-pages.com/uploads/6317587720044544/logo_2.png" style="border:0px solid #3498DB;border-radius:0px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;max-width:100%;box-sizing: border-box;" width="150" height="auto" /> </td> 
                            </tr> 
                           </tbody> 
                          </table> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
               </tr> 
              </tbody> 
             </table> 
            </div> 
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--> </td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
     </tr> 
    </tbody> 
   </table> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
    <tbody> 
     <tr> 
      <td> 
       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
       <div style="margin:0px auto;max-width:600px;"> 
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
         <tbody> 
          <tr> 
           <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="eb-section-outlook mjml-section-eb_34642558-4efb-47a4-a325-225836cc1f1e-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="eb-section-outlook mjml-section-eb_34642558-4efb-47a4-a325-225836cc1f1e-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
            <div class="eb-section mjml-section-eb_34642558-4efb-47a4-a325-225836cc1f1e" style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"> 
             <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"> 
              <tbody> 
               <tr> 
                <td style="direction:ltr;font-size:0px;padding:10px 10px 10px 10px;text-align:center;"> 
                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:290px;" ><![endif]--> 
                 <div class="mj-column-per-50 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px 0px 0px 0px ;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671454598797RAND5354134 mj-text" style="background:transparent;font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: center;"><span style="mso-line-height-rule:exactly;color: #000066;"><strong style="mso-line-height-rule:exactly;">SUBTOTAL: ${NumberUtils.formatCurrency(price)}</strong></span></p>
                          </div> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:290px;" ><![endif]--> 
                 <div class="mj-column-per-50 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px 0px 0px 0px ;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td align="left" class="mjml-content-eb_fc7fedea-a12a-4ade-8b00-3c2ab025908b mj-text" style="background:transparent;font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: center;"><span style="mso-line-height-rule:exactly;text-decoration: underline; color: #000000;">${DateUtils.formatDateToPTT(new Date)}</span></p>
                          </div> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
               </tr> 
              </tbody> 
             </table> 
            </div> 
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--> </td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
     </tr> 
    </tbody> 
   </table> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
    <tbody> 
     <tr> 
      <td> 
       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
       <div style="margin:0px auto;max-width:600px;"> 
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
         <tbody> 
          <tr> 
           <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="eb-section-outlook mjml-section-id1671618845058RAND6390165-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="eb-section-outlook mjml-section-id1671618845058RAND6390165-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
            <div class="eb-section mjml-section-id1671618845058RAND6390165" style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"> 
             <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"> 
              <tbody> 
               <tr> 
                <td style="direction:ltr;font-size:0px;padding:0px 10px 10px 10px;text-align:center;"> 
                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:580px;" ><![endif]--> 
                 <div class="mj-column-per-100 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px 0px 0px 0px ;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td align="center" class="mjml-content-id1671620355591RAND6178329 eb-divider" style="background:transparent;font-size:0px;padding:10px 25px;padding-top:0px;padding-right:15px;padding-bottom:0px;padding-left:15px;word-break:break-word;"> <p style="border-top:solid 2px #cccccc;font-size:1px;margin:0px auto;width:100%;"> </p> 
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #cccccc;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--> </td> 
                        </tr> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671600105827RAND2473437 mj-text" style="background:transparent;font-size:0px;padding:10px 15px 0px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: center;"><span style="mso-line-height-rule:exactly;font-size: 36px; color: #000066;"><strong style="mso-line-height-rule:exactly;">Compra de Treinamento</strong></span></p>
                          </div> </td> 
                        </tr> 
                        <tr> 
                         <td align="center" class="mjml-content-id1671620489345RAND6078335 eb-divider" style="background:transparent;font-size:0px;padding:10px 25px;padding-top:0px;padding-right:15px;padding-bottom:0px;padding-left:15px;word-break:break-word;"> <p style="border-top:solid 3px #ff0f47;font-size:1px;margin:0px auto;width:19%;"> </p> 
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 3px #ff0f47;font-size:1px;margin:0px auto;width:104.5px;" role="presentation" width="104.5px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--> </td> 
                        </tr> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671620460332RAND1630279 mj-text" style="background:transparent;font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: center;">Olá, Sr.(a) ${name}, Seja bem vindo ao seu treinamento, neste treinamento voc&ecirc; poder&aacute; aprender e exercitar resolvendo os desafios presentes na plataforma.</p>
                          </div> </td> 
                        </tr> 
                        <tr> 
                         <td align="center" class="mjml-content-id1671620573657RAND5134316 eb-divider" style="background:transparent;font-size:0px;padding:10px 25px;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;word-break:break-word;"> <p style="border-top:solid 2px #cccccc;font-size:1px;margin:0px auto;width:100%;"> </p> 
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #cccccc;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
               </tr> 
              </tbody> 
             </table> 
            </div> 
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--> </td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
     </tr> 
    </tbody> 
   </table> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
    <tbody> 
     <tr> 
      <td> 
       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
       <div style="margin:0px auto;max-width:600px;"> 
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
         <tbody> 
          <tr> 
           <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="eb-section-outlook eb-template-last-section-outlook mjml-section-id1671620645934RAND7423153-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="eb-section-outlook eb-template-last-section-outlook mjml-section-id1671620645934RAND7423153-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
            <div class="eb-section eb-template-last-section mjml-section-id1671620645934RAND7423153" style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"> 
             <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"> 
              <tbody> 
               <tr> 
                <td style="direction:ltr;font-size:0px;padding:10px 10px 10px 10px;text-align:center;"> 
                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:290px;" ><![endif]--> 
                 <div class="mj-column-per-50 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px 0px 0px 0px ;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671620655041RAND5436917 mj-text" style="background:transparent;font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0; word-break: break-word; line-height: 1.6;"><span style="mso-line-height-rule:exactly;font-size: 16px;"><strong style="mso-line-height-rule:exactly;">${courseTitle}</strong></span></p>
                          </div> </td> 
                        </tr> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671620673727RAND9929437 mj-text" style="background:transparent;font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: left;">COMPRA REALIZADA - <strong style="mso-line-height-rule:exactly;"><span style="mso-line-height-rule:exactly;color: #e67e23;">PENDENTE</span></strong></p> 
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: left;"><span style="mso-line-height-rule:exactly;font-size: 11px;">Sua compra ser&aacute; aprovada muito em breve pelo nosso suporte ap&oacute;s a valida&ccedil;&atilde;o do comprovante</span></p>
                          </div> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:290px;" ><![endif]--> 
                 <div class="mj-column-per-50 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px 0px 0px 0px ;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671620783808RAND2097426 mj-text" style="background:transparent;font-size:0px;padding:43px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: center;">Treinamento&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${NumberUtils.formatCurrency(price)} </p>
                          </div> </td> 
                        </tr> 
                        <tr> 
                         <td align="center" class="mjml-content-id1671620852867RAND3883276 eb-divider" style="background:transparent;font-size:0px;padding:10px 25px;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;word-break:break-word;"> <p style="border-top:solid 2px #cccccc;font-size:1px;margin:0px auto;width:100%;"> </p> 
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px #cccccc;font-size:1px;margin:0px auto;width:260px;" role="presentation" width="260px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--> </td> 
                        </tr> 
                        <tr> 
                         <td align="left" class="mjml-content-id1671620860782RAND6459342 mj-text" style="background:transparent;font-size:0px;padding:10px 15px 10px 15px;word-break:break-word;"> 
                          <div style="font-family:'Noto Sans',Roboto,Tahoma,Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1.6;text-align:left;color:#000000;">
                           <p style="margin:0;mso-line-height-rule:exactly;margin: 0px; word-break: break-word; line-height: 1.6; text-align: center;"><strong style="mso-line-height-rule:exactly;">Total&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${NumberUtils.formatCurrency(price)} </strong></p>
                          </div> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
               </tr> 
              </tbody> 
             </table> 
            </div> 
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--> </td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
     </tr> 
    </tbody> 
   </table> 
   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
    <tbody> 
     <tr> 
      <td> 
       <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
       <div style="margin:0px auto;max-width:600px;"> 
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> 
         <tbody> 
          <tr> 
           <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="eb-section-outlook mjml-section-undefined-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="eb-section-outlook mjml-section-undefined-outlook" role="presentation" style="width:600px;" width="600" bgcolor="transparent" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--> 
            <div class="eb-section mjml-section-undefined" style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;"> 
             <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;"> 
              <tbody> 
               <tr> 
                <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"> 
                 <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="mjml-column-undefined-outlook" style="vertical-align:top;width:600px;" ><![endif]--> 
                 <div class="mj-column-per-100 mj-outlook-group-fix mjml-column-undefined" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> 
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"> 
                   <tbody> 
                    <tr> 
                     <td style="vertical-align:top;padding:0px;"> 
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"> 
                       <tbody> 
                        <tr> 
                         <td class="mjml-content-e8a96e86-3572-c1a6-57e9-dc63668febe6" style="background:transparent;font-size:0px;word-break:break-word;"> 
                          <div style="height:50px;line-height:50px;">
                            
                          </div> </td> 
                        </tr> 
                       </tbody> 
                      </table> </td> 
                    </tr> 
                   </tbody> 
                  </table> 
                 </div> 
                 <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
               </tr> 
              </tbody> 
             </table> 
            </div> 
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--> </td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <!--[if mso | IE]></td></tr></table><![endif]--> </td> 
     </tr> 
    </tbody> 
   </table> 
  </div>   
 </body>
</html>

`;