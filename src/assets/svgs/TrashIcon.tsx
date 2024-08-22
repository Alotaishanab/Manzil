import * as React from 'react';
import Svg, {G, Rect, Defs, Pattern, Use, Image} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const TrashIcon = props => {
  const {width, height} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 46}
      height={height || 58}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 46} height={height || 58} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.02439 0 0 .01934 0 -.003)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={35}
          height={42}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAA0CAIAAACYSobkAAAKTklEQVR4nO1Y288k11H/1Tl9mZ7rd9ldO7vaXW92l9ixlyTsBkykxAHFWM5LQl54ieQgLpH/AYOUIN4QEHiECIjygIIA4YRIEQoSUhKEkrWctQ12BBFREsfZXe915puZ7unuc6kfDzPzffOtLfkNJORSPfSp7lN1qk6dqv4dIYn/I0re4j0BOTxc0lsKD5GuH8ym1ECxZq6/06XCFRMEpvMZCecRI3wAgUXdNq0nUDfwHj6AxN5s6qNTQhVKKEFGYsVghHJlSwlGrlnJSHrSLwdKqlKVs3ml5O1b7tO/9ZmTJy4KjgC9TjHs9XaBHrB78sTFpz/9e3fvBCWnszIqV0xVOmW7ZGpYSpfmVrZVqaqkJ52u2Ot6BV45K/nkk79hzTv7vQvAqdHWebE7xh7d2v4Zwel+70Jiz370o785rxi4shrpItvIOrJW1spWNage2N7cb+Uqxvs7ZAABEhFRxXe/+4IqymrRyYsQnMCqqnMuzztltQD0ueeeD2G58QT8Wones80b+735THM4YQIQAQ/g1dd+NKvuENW586fG0+9fu/GjNtzyeufajR+Pp98/d/4UsJhVd1597YcAAA+EdeqYDTc2STb9FsCCBoKNaarAdD7tDzqj0aBO3XhyK80Ag6gQQaeDxGKyd3swGhTdZDDsTcvZsN8xMGursvYK95hPuBxyFfTVa7EqFlCIAhgNRpHJ7Ruvp91hfzS8M9H+wERVa00kJuOYdtKyLuc37wy3tgb9HFCFXfpqCHB1DFemZGXPHBxPbvDSbRpoQiZKTCeNyQd+EXe2j+9sm6ZGlhgrWFS6u2NHw/va0qedrb1J5YKAFrSgrPVs8EZ6yWy2l+e9L37xS9/65uWbN/aqsi16QwBZbls3F9G6bbK056N9/rmXoWZre+c97314Xt1OMwps04Rh/9grL//XZDIB/Psf/dk0o6/nRVGoijVFDEjTdFHOsxwnT93/wQ/9/FNP/VrbVsNRX0h/+fILH/jALxn0O/k2NUmz/qwaAwHwg0G3XFSMpujv1pWmaeFd1esPGjeJ2hhjqEmR7yyqMsv7rq06PdPWe8bqoNff25sDKZDtbh11TRW1btxEUV2+/I1HH/05Qg2BwXA4Gu2cPXtOmdY+zqpma3B/t9iGpEHJ6MRqXU76vXRnq2sEVXkbrFMbExMEzaK6ZY3sbHV7vbSpJmJi9K71AcjybGvUu2+8V84bF2nPPHB+a7SzvbNDYFZOZb6YdIvRv/3rizdfnz/99DPjvdmgOPK5P/mj4yePEE1kmWVGDMd3Z4ydLCucc9ViL8naNDUi0rYhuHw42MmyvK5LmPbo0e0Q1Ds10oPmr18dP/PM75TNeHs0+Pyf//E7Tgw/+Nj7GjeP0aNqpi74QN65y/vv+0XBQ0Xn0tWfsmnpldduzuZtu3BtIH1kVdMFtoFNbFtWjos6NI2nj6wbukBP1j6Ubbh+q/KRreO1q+x2fsHiwol3fGg8ZlA2rZ9Xe0pnsiwDNAT0+6iqeZqYEJpeHz4Agq2dtJORcICKQZ6jaWksEkNBEITE0lg0LdIMxkIASJtnOtyyMPAB3R5aV9mE1WLeH8B5RPXWWkASkolNfIRNYROkmRBoHFKJbJ3N6lajoPj6P/0LtPPEE48ZFQTQGO9VRBJroDAKBnz9n78JaR9/8rEmTglTLRBc3tawiVoxxlAExiDLCh/qpm3gtR7P7wZyXnE0egg43Sne9fpNDWTZzgPndZz82V/8JdDb2Tr/4pWflHMuG0zQNtItn6uSL73w2vboHND7/F99odG9wHnlFp68cYtZ9iBw5ujR902mGsh5NVN6JY0RO+j3iZh3kWSptZlvfScXKIost8gzM3rphR8kye5sHl/6j+91ewgxCCBMoFaAEEPRxYv//sq81DQ98uKV/05laJB30oyKPEMMztpEEfsDIWK3mxOErkrusqEfrvRclkArKmBKpFiWSVn2mGVNNKuWI8uhJVIwBUVgAX2z/hX39b95d/vfobdtv237bdtv237b9v8b2+ZgBXzjEFj9VpOygseykqsQm0OKYhONc98x8wZoYigHsCUBAVjQCiwIWbZFFSVUjBoBIiSCADMQYBTowVAixEehilmjDiMAlxiDFrAEiETXyOgwULvH732iAURlo8cThliHYSXTpRtL/9ZCs17Hht9mH+VijVsA2b+EWGuT9WdMgASQDVyzuTv7wUtWwqUqwQGyXKnivv43uCiErKOynm8IiBoqwPV+KcQDAaJcGSCgSwQmh9YNiELuRWPYuOtRiN2AgfvqlpMdxMO0kBYCmAaIapyIFVgYC+lAWkgLCCSs/eOB8oNwHmxcshEHiwPcuC80AkAoVACrTJYIREhYfrmEmxA1UELNfmygkGXS7vuADf0wmwvBZjZtSrjE7wLY9SxDGG4e0SXuRYIVor9HrR5Wrvt+H74SWX20znwCSMAUiKIJCDAFDAjIMr+sIZbJaNSujquY/V/Sw7Qf48O5lmVJjG2a5CREEIJCTFm2vmEvH3bS4WS8AJGY5M7dxkgf6O5NQ2ISEE3NIt8ykqs3TaOAxEiBgOh1BzHWaWrvWcUh2865PO+1bes9Y4CIme7NukX+yIWH5uUtZXv23GkAIWB3dwRAIKNRz3sAOPPOk6qN89OHH3mwk5vx3Ykx1jl1TpumSZJuWN1BHdChO82qqvN8kFjJc/E+dorOaNQB8Ouf+sR0fv3Ysd2P/MqjauBjnSCt6pJkvztwbEV6H/7li3/wh797/frNTz31q2Kws3MUghB8mqZ53lFKXbf3hj/SedaOzpHn3/XhPH8YeOCVV+4y8tUfX52OKyqjsmxapzEwNrFe+NJrVbtp7aZeq7Kd1WERGJvgp9VCSSrHt2fXrt5U5csv3QLOJMmDDz38EUc6tp6tp9PIQzE/dfIBVRzdPf7lL/8jgNOnT3TyrkbUzaKbG4iv2zIxNksyFzRNizQt6tbnWZ7apKpnhBt007qpNSLPBsePHwPx7LNfOXbkuCpOnzrzpn63S7//9u++A5ztdt47HFz4/c/+6U9/MmZgs6BGRmUgG8+y1sbTK6uGdctFy9qxWYZOqWSIbCsy8PrV6Wc/87lB8e5B7yJw9h+efd6Rjm7fb4l0ChICpL7GE4//9ne+/W2iSe0iy9HNB7cm41Rym2T9/rBtwrwu83TY7w9ms5k1aZpZ753zi26eZblt27puKsJv9QeB7WIRyV6aDC++/9I3vvUFkwHwAgJiNV3ZXnbPdoF6gccf/8QPf/Cf1raz+d7OaHdvWmZp33klJEu6xtjWE4RN0swm83bWMXl/0CnLuYuLLEmonmiLws6rWbcYivTe/ch7vva1v+/1kRWARCAaiGgqpOfqsJlFxW4h8zm++pWvfulv/vrKlSvlfGFtSsqqtAHLrig0FAhBgRwq1AqhTWKMrtfrXbp06ZOffOpjH//4YCDVQnv99U8HABgh/X5drBe+KFIAi0XUiKKw1iLGQyX5rUkgAjFQRV0HY1AUCYC69kU33Vgl/gdpgcpZKmgsxwAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
};
