import Title from "../title"
import { IBM_Plex_Sans } from 'next/font/google'
import KnowAdrenalinCard from "./card"

const ibm = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: "400"
})

export default function KnowAdrenalin() {
    return (
        <div className="w-full py-7 border-b border-t border-gray-300" style={{ userSelect: 'none' }}>
            <div className={ibm.className}>
                <Title title="Conheça a Adrenalin" subtitle="Sobre" />
                <div className="flex justify-center text-gray-300 flex-wrap">
                    <KnowAdrenalinCard src="/icons/camping.png" title="Para todos os esportes" description="Confira a variedade de
                        categorias, seja você um piloto competitivo ou um hiker amador, temos todos os produtos que 
                        você precisa."/>
                    <KnowAdrenalinCard src="/icons/80.png" title="Melhores Ofertas" description="Aproveite o frete grátis para o Brasil todo
                        e garanta sua compra com uma oferta especial! Descontos de até 80% na promoção relâmpago!"/>
                    <KnowAdrenalinCard src="/icons/star.png" title="Avaliações" description="Sistema de avaliações em todos os produtos, confira
                        a opinião de quem já comprou e garanta uma boa compra!" />
                </div>
            </div>
        </div>
    )
}