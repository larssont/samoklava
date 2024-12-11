module.exports = {
  params: {
    designator: 'RP2040Zero',
    side: 'F',
    reverse: false,
    P5V: {type: 'net', value: 'P5V'},
    GND: {type: 'net', value: 'GND'},
    P3V3: {type: 'net', value: 'P3V3'},
    GP29: {type: 'net', value: 'GP29'},
    GP28: {type: 'net', value: 'GP28'},
    GP27: {type: 'net', value: 'GP27'},
    GP26: {type: 'net', value: 'GP26'},
    GP15: {type: 'net', value: 'GP15'},
    GP14: {type: 'net', value: 'GP14'},
    GP13: {type: 'net', value: 'GP13'},
    GP12: {type: 'net', value: 'GP12'},
    GP11: {type: 'net', value: 'GP11'},
    GP10: {type: 'net', value: 'GP10'},
    GP9: {type: 'net', value: 'GP9'},
    GP8: {type: 'net', value: 'GP8'},
    GP7: {type: 'net', value: 'GP7'},
    GP6: {type: 'net', value: 'GP6'},
    GP5: {type: 'net', value: 'GP5'},
    GP4: {type: 'net', value: 'GP4'},
    GP3: {type: 'net', value: 'GP3'},
    GP2: {type: 'net', value: 'GP2'},
    GP1: {type: 'net', value: 'GP1'},
    GP0: {type: 'net', value: 'GP0'}
  },
  body: p => {
    const standard = `
    (module RP2040-Zero (layer F.Cu)(tedit 61F3691B)
      ${p.at /* parametric position */}
      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 10.16 -15.45 ${p.rot}) (layer F.Fab)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (fp_line (start 19.16 -24.45) (end 1.16 -24.45) (layer F.SilkS) (width 0.12))  
      (fp_line (start 1.16 -24.45) (end 1.16 -0.95) (layer F.SilkS) (width 0.12))
      (fp_line (start 1.16 -0.95) (end 19.16 -0.95) (layer F.SilkS) (width 0.12))
      (fp_line (start 19.16 -0.95) (end 19.16 -24.45) (layer F.SilkS) (width 0.12))
      (fp_line (start 1.16 -24.45) (end 19.16 -24.45) (layer F.CrtYd) (width 0.05))
      (fp_line (start 19.16 -24.45) (end 19.16 -0.95) (layer F.CrtYd) (width 0.05))
      (fp_line (start 19.16 -0.95) (end 1.16 -0.95) (layer F.CrtYd) (width 0.05))
      (fp_line (start 1.16 -0.95) (end 1.16 -24.45) (layer F.CrtYd) (width 0.05))
      (fp_line (start 5.83 -25.45) (end 5.83 -24.45) (layer F.Fab) (width 0.1))
      (fp_line (start 14.46 -25.45) (end 14.46 -24.45) (layer F.Fab) (width 0.1))
      (fp_line (start 5.83 -25.45) (end 14.46 -25.45) (layer F.Fab) (width 0.1))
    `

    const hole_for_buttons = `
      ${ '' /* holes so that we can access reset and boot button on upside down mcu */}
      (fp_line (start 5 -5.13) (end 15.5 -5.13) (layer Edge.Cuts) (width 0.12))
      (fp_line (start 5 -5.13) (end 5 -10.5) (layer Edge.Cuts) (width 0.12))
      (fp_line (start 15.5 -10.5) (end 15.5 -5.13) (layer Edge.Cuts) (width 0.12))
      (fp_line (start 15.5 -10.5) (end 5 -10.5) (layer Edge.Cuts) (width 0.12))
      
    `
    // Define constants shared across pins
    const DRILL = 1.0922;
    const ROUNDRECT_RRATIO = 0.25;

    // Pin-specific variable attributes
    const pinAttrs = [
        { n: 1, x: 17.78, y: -22.86, w: 2.6, h: 1.6, offsetX: 0.6, offsetY: 0, str: p.GP0.str, side: "right"},
        { n: 2, x: 17.78, y: -20.32, w: 2.6, h: 1.6, offsetX: 0.6, offsetY: 0, str: p.GP1.str, side: "right"},
        { n: 3, x: 17.78, y: -17.78, w: 2.6, h: 1.6, offsetX: 0.6, offsetY: 0, str: p.GP2.str, side: "right"},
        { n: 4, x: 17.78, y: -15.24, w: 2.6, h: 1.6, offsetX: 0.6, offsetY: 0, str: p.GP3.str, side: "right"}, 
        { n: 5, x: 17.78, y: -12.7, w: 2.6, h: 1.6, offsetX: 0.6, offsetY: 0, str: p.GP4.str, side: "right"}, 
        { n: 6, x: 17.78, y: -10.16, w: 2.6, h: 1.6002, offsetX: 0.6, offsetY: 0, str: p.GP5.str, side: "right"}, 
        { n: 7, x: 17.78, y: -7.62, w: 2.6, h: 1.6002, offsetX: 0.6, offsetY: 0, str: p.GP6.str, side: "right"}, 
        { n: 8, x: 17.78, y: -5.08, w: 2.6, h: 1.6002, offsetX: 0.6, offsetY: 0, str: p.GP7.str, side: "right"}, 
        { n: 9, x: 17.78, y: -2.54, w: 2.6, h: 1.6002, offsetX: 0.6, offsetY: 0, str: p.GP8.str, side: "right"}, 
        { n: 10, x: 15.24, y: -2.33, w: 1.6, h: 2.6, offsetX: 0, offsetY: 0.6, str: p.GP9.str, side: "bottom"}, 
        { n: 11, x: 12.7, y: -2.33, w: 1.5748, h: 2.6, offsetX: 0, offsetY: 0.6, str: p.GP10.str, side: "bottom"}, 
        { n: 12, x: 10.16, y: -2.33, w: 1.5748, h: 2.6, offsetX: 0, offsetY: 0.6, str: p.GP11.str, side: "bottom"}, 
        { n: 13, x: 7.62, y: -2.33, w: 1.5748, h: 2.6, offsetX: 0, offsetY: 0.6, str: p.GP12.str, side: "bottom"}, 
        { n: 14, x: 5.08, y: -2.33, w: 1.5748, h: 2.6, offsetX: 0, offsetY: 0.6, str: p.GP13.str, side: "bottom"}, 
        { n: 15, x: 2.54, y: -2.54, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GP14.str, side: "left"}, 
        { n: 16, x: 2.54, y: -5.08, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GP15.str, side: "left"}, 
        { n: 17, x: 2.54, y: -7.62, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GP26.str, side: "left"}, 
        { n: 18, x: 2.54, y: -10.16, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GP27.str, side: "left"}, 
        { n: 19, x: 2.54, y: -22.86, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.P5V.str, side: "left"}, 
        { n: 20, x: 2.54, y: -20.32, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GND.str, side: "left"}, 
        { n: 21, x: 2.54, y: -17.78, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.P3V3.str, side: "left"}, 
        { n: 22, x: 2.54, y: -12.7, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GP28.str, side: "left"}, 
        { n: 23, x: 2.54, y: -15.24, w: 2.6, h: 1.6002, offsetX: -0.6, offsetY: 0, str: p.GP29.str, side: "left"}, 
    ];

    function pins(def_neg, def_pos) {
      return `
        ${'' /* pin names */}
        ${
            pinAttrs.map(pin => `
                (fp_text user ${pin.str} (at ${pin.x} ${pin.y - 2.18} ${p.rot + 90}) 
                (layer F.SilkS) 
                (effects (font (size 0.8 0.8) (thickness 0.15))))
            `).join('')
        }

        ${'' /* actual pins */}
        ${
            pinAttrs.map(pin => `
                (pad ${pin.n} thru_hole roundrect (at ${pin.x} ${pin.y} ${p.rot}) 
                (size ${pin.w} ${pin.h}) 
                (drill ${DRILL} (offset ${pin.offsetX} ${pin.offsetY})) 
                (layers *.Cu *.Mask) 
                (roundrect_rratio ${ROUNDRECT_RRATIO}) 
                ${pin.str})
            `).join('')
        }

      `
    }
    if (p.reverse) {
      return `
        ${standard}
        ${hole_for_buttons}
        ${pins('-', '')}
        ${pins('', '-')}
        )
        `
    } else {
      return `
        ${standard}
        ${hole_for_buttons}
        ${pins('-', '')}
        )
        `
    }
  }
  
}


        // (pad 1 thru_hole roundrect (at 17.78 -22.86 ${p.rot}) (size 2.6 1.6) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP0.str})
        // (pad 2 thru_hole roundrect (at 17.78 -20.32 ${p.rot}) (size 2.6 1.6) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP1.str})
        // (pad 3 thru_hole roundrect (at 17.78 -17.78 ${p.rot}) (size 2.6 1.6) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP2.str})
        // (pad 4 thru_hole roundrect (at 17.78 -15.24 ${p.rot}) (size 2.6 1.6) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP3.str})
        // (pad 5 thru_hole roundrect (at 17.78 -12.7 ${p.rot}) (size 2.6 1.6) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP4.str})
        // (pad 6 thru_hole roundrect (at 17.78 -10.16 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP5.str})
        // (pad 7 thru_hole roundrect (at 17.78 -7.62 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP6.str})
        // (pad 8 thru_hole roundrect (at 17.78 -5.08 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP7.str})
        // (pad 9 thru_hole roundrect (at 17.78 -2.54 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset 0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP8.str})
        
        // (pad 10 thru_hole roundrect (at 15.24 -2.33 ${p.rot}) (size 1.6 2.6) (drill 1.0922 (offset 0 0.6)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP9.str})
        // (pad 11 thru_hole roundrect (at 12.7 -2.33 ${p.rot}) (size 1.5748 2.6) (drill 1.0922 (offset 0 0.6)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP10.str})
        // (pad 12 thru_hole roundrect (at 10.16 -2.33 ${p.rot}) (size 1.5748 2.6) (drill 1.0922 (offset 0 0.6)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP11.str})
        // (pad 13 thru_hole roundrect (at 7.62 -2.33 ${p.rot}) (size 1.5748 2.6) (drill 1.0922 (offset 0 0.6)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP12.str})
        // (pad 14 thru_hole roundrect (at 5.08 -2.33 ${p.rot}) (size 1.5748 2.6) (drill 1.0922 (offset 0 0.6)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP13.str})

        // (pad 15 thru_hole roundrect (at 2.54 -2.54 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP14.str})
        // (pad 16 thru_hole roundrect (at 2.54 -5.08 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP15.str})
        // (pad 17 thru_hole roundrect (at 2.54 -7.62 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP26.str})
        // (pad 18 thru_hole roundrect (at 2.54 -10.16 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP27.str})
        // (pad 19 thru_hole roundrect (at 2.54 -22.86 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.P5V.str})
        // (pad 20 thru_hole roundrect (at 2.54 -20.32 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GND.str})
        // (pad 21 thru_hole roundrect (at 2.54 -17.78 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.P3V3.str})
        // (pad 22 thru_hole roundrect (at 2.54 -12.7 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP28.str})
        // (pad 23 thru_hole roundrect (at 2.54 -15.24 ${p.rot}) (size 2.6 1.6002) (drill 1.0922 (offset -0.6 0)) (layers *.Cu *.Mask) (roundrect_rratio 0.25) ${p.GP29.str})


        // (fp_text user ${p.GP0.str} (at 17.78 -22.86 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP1.str} (at 17.78 -20.32 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP2.str} (at 17.78 -17.78 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP3.str} (at 17.78 -15.24 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP4.str} (at 17.78 -12.7 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP5.str} (at 17.78 -10.16 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP6.str} (at 17.78 -7.62 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP7.str} (at 17.78 -5.08 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP8.str} (at 17.78 -2.54 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP9.str} (at 15.24 -2.33 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP10.str} (at 12.7 -2.33 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP11.str} (at 10.16 -2.33 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP12.str} (at 7.62 -2.33 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP13.str} (at 5.08 -2.33 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP14.str} (at 2.54 -2.54 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP15.str} (at 2.54 -5.08 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP26.str} (at 2.54 -7.62 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP27.str} (at 2.54 -10.16 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.P5V.str} (at 2.54 -22.86 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GND.str} (at 2.54 -20.32 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.P3V3.str} (at 2.54 -17.78 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP28.str} (at 2.54 -12.7 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        // (fp_text user ${p.GP29.str} (at 2.54 -15.24 ${p.rot + 90}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))