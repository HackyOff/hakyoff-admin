import { AbreviateString } from "../abreviate-utils";
import { bg } from "../image-exporter";

export function certificateTemplateGenerated(nome: AbreviateString | null, curso: string, id: any, dateIssued: string) {
    const iniciaisCurso = curso.split(' ').map(palavra => palavra[0]).join('');

    return `
    <div class='hacker' style="font-family: 'Anonymous Pro', monospace;  width: 100%;   margin: 0; padding: 0; display: flex; justify-content: start; align-items: center; height: 22rem;">
        <div style="width: 100%; height:  100%; position: relative; color: #fff; padding: 10px; box-sizing: border-box;">
         <div style="  z-index: 999; width: 100%; height: 100%; position: absolute; top: 0; bottom:0 ; left: 0; right: 0">
           </div>
            <img style='width: 100%; height: 100%; position: absolute; top: 0; bottom:0 ; left: 0; right: 0' src='${bg.bg_certificate}'>
                
            <div style="width: 100%; z-index: 99; height: 100%; position: absolute; padding: 20px; box-sizing: border-box;">
            <br>    
            <div style="width: 70%; font-size: 10px; letter-spacing: 2px; margin-top: 30px;">
                    Nós Certificamos que
                    <span style="font-weight: bold; color: #FFCC00;">${nome}</span>
                    Concluiu com sucesso o treinamento de:
                </div> 
                <div style="font-size: 50px; font-weight: bold; color: #FFCC00;">${iniciaisCurso}</div>
                
                <div style="width: 70%; font-size: 10px; letter-spacing: 2px; font-weight: bold; color: #FFCC00;">
                    ${curso}. <span style="color:white; font-weight: normal;">Um treinamento ministrado pela HakyOff.</span>
                </div>
                <br>
                <div style="font-size: 12px; letter-spacing: 1px;">
                    Este certificado foi emitido aos ${dateIssued}.
                </div>
                
                <div style="font-size: 10px; font-weight: bold;">
                    <br> <br> 
                    <center>
                        <span>______________________________</span>
                        <br>
                        <span>O DIRECTOR</span>
                    </center>
                </div>
                <div style="font-size: 7px; text-align: right; position: absolute; color: black; bottom: 2rem; right: 1.5rem;">
                    ID: ${id}_H4K_${dateIssued.split('/')[2]}
                </div>
            </div>
        </div>
    </div> 
    `;
}
