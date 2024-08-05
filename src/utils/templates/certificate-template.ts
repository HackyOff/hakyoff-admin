import { AbreviateString } from "../abreviate-utils";

export function certificateTemplate(nome: AbreviateString | null, curso: string, id: any, dateIssued: string) {
    const iniciaisCurso = curso.split(' ').map(palavra => palavra[0]).join('');

    return `
    <div class='hacker' style="font-family: 'Anonymous Pro', monospace;  width: 1230px;   margin: 0; padding: 0; display: flex; justify-content: start; align-items: center; height: 865.8px;">
        <div style="width: 100%; height:  865.8px; position: relative; color: #fff; padding: 40px; box-sizing: border-box;">
        <img style='width: 100%; height: 100%; position: absolute; top: 0; bottom:0 ; left: 0; right: 0' src='https://raw.githubusercontent.com/Katumbela/my_images/9dcd7cac9c5274ff79cb1c91ac41737e4c57a293/Certficado.png'>
                
            <div style="width: 100%; z-index: 9999; height: 100%; position: absolute; padding: 80px; box-sizing: border-box;">
            <br><br>    
            <div style="width: 70%; font-size: 25px; letter-spacing: 5px; margin-top: 30px;">
                    Nós Certificamos que
                    <span style="font-weight: bold; color: #FFCC00;">${nome}</span>
                    Concluiu com sucesso o treinamento de:
                </div> 
                <div style="font-size: 140px; font-weight: bold; color: #FFCC00;">${iniciaisCurso}</div>
                <br><br> 
                <div style="width: 70%; font-size: 18px; letter-spacing: 2px; font-weight: bold; color: #FFCC00;">
                    ${curso}. <span style="color:white; font-weight: normal;">Um treinamento ministrado pela HakyOff.</span>
                </div>
                <br>
                <div style="font-size: 16px; letter-spacing: 1px;">
                    Este certificado foi emitido aos ${dateIssued}.
                </div>
                
                <div style="font-size: 20px; font-weight: bold;">
                    <br><br><br><br>
                    <center>
                        <span>______________________________</span>
                        <br>
                        <span>O DIRECTOR</span>
                    </center>
                </div>
                <div style="font-size: 14px; text-align: right; position: absolute; color: black; bottom: 6rem; right: 6rem;">
                    ID: ${id}_H4K_${dateIssued.split('/')[2]}
                </div>
            </div>
        </div>
    </div> 
    `;
}
