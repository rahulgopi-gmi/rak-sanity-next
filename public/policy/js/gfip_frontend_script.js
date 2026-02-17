"use strict";
( function( $ ) {
var $j = jQuery.noConflict();

var GC_SPF = {
    formatValidation: function(phoneID) {
        var errorMsg = phoneID.parent().parent().parent().find(".error-msg"),
            validMsg = phoneID.parent().parent().parent().find(".valid-msg");

        if ($j.trim(phoneID.val())) {
            if (phoneID.intlTelInput("isValidNumber")) {
                validMsg.removeClass("hide");
                errorMsg.addClass("hide");
            }
        } else {
            validMsg.addClass("hide");
            errorMsg.addClass("hide");
        }
    },
    isInputValid: function(phoneID, teleInput, index) {
        var errorMsg = phoneID.parent().parent().parent().find(".error-msg"),
            validMsg = phoneID.parent().parent().parent().find(".valid-msg");

        if ($j.trim(phoneID.val())) {
            if (phoneID.intlTelInput("isValidNumber")) {
                phoneID.attr('aria-invalid', false);
                phoneID.removeClass("error");
                validMsg.removeClass("hide");
                errorMsg.addClass("hide");
                var nationalPhone = teleInput.intlTelInput("getNumber");
                GC_SPF.createCookie("gf_spf_" + index, nationalPhone, 1500);
                $j(teleInput).closest("div").find("input:hidden").val(nationalPhone);
            } else {
                phoneID.attr('aria-invalid', true);
                phoneID.addClass("error");
                errorMsg.removeClass("hide");
                validMsg.addClass("hide");
                var nationalPhone = teleInput.intlTelInput("getNumber");
                GC_SPF.createCookie("gf_spf_" + index, nationalPhone, 1500);
                $j(teleInput).closest("div").find("input:hidden").val(nationalPhone);
            }
        } else {
            $j(teleInput).closest("div").find("input:hidden").val("");
        }    
    },
    populatePhoneMeta: function( insertID, option, data ) {
        var getData;
        switch (option) {
            case "cdc":
                getData = data.dialCode;
                break;
            case "cdcp":
                getData = "+" + data.dialCode;
                break;
            case "cn":
                var nameInE = new Intl.DisplayNames(["en"], { type: "region" });
                getData = data.iso2 ? nameInE.of(data.iso2.toUpperCase()) : '';
                break;
            case "cc":
                getData = data.iso2 ? data.iso2.toUpperCase() : '';
                break;
            default:
                getData = "";
                break;
        }

        $j(insertID).val(getData).trigger("change");
    },
    createCookie: function(name, value, minutes) {
        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime() + minutes * 60 * 1000);
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie: function( name ) {
        const value = "; " + document.cookie; 
        const parts = value.split("; " + name + "="); 
        if (parts.length == 2) {
            const vlu = parts.pop().split(";").shift(); 
            const decode_vlu = decodeURIComponent(vlu) ; 
            const replace_vlu = decode_vlu.replace(/[+]/g, ' ');
            return replace_vlu ; 
        }
        return '' ;
    }
};



$j(document).bind("gform_post_render", function (event, form_id, current_page) {
    var gfipMainData = window["gfipFieldsData"];

    if (!gfipMainData) {
        return;
    }

    jQuery('.smart_phone_field').each( function(i, e) {
        var _this       = jQuery(this).find('.ginput_container_phone'),
            phoneData   = _this.data(),
            form_id     = phoneData.formid,
            field_id    = phoneData.fieldid,
            input_id    = '#input_' + phoneData.formid + '_' + phoneData.fieldid,
            field_input = 'input_' + phoneData.fieldid,
            options     = {
                utilsScript: gfipMainData.utilsScript,
                formatOnDisplay: true,
                initialCountry: 'us',
                countrySearch: false,
                fixDropdownWidth: true,
                useFullscreenPopup: false,
                hiddenInput: function(telInputName) {
                    return {
                        phone: field_input
                    }
                }
            };

        if (phoneData.placeholder) {
            options.autoPlaceholder = "off";
        }

        if(phoneData.exin_country && phoneData.pre_country && phoneData.exin_country == 'pre_only') {
            options.preferredCountries = phoneData.pre_country.split(',');
        }

        if(phoneData.exin_country && phoneData.pre_country && phoneData.exin_country == 'ex_only') {
            options.onlyCountries = phoneData.pre_country.split(',');
        }

        if ( phoneData.de_country !== 0 && phoneData.auto_flag === 0 ) {
            options.initialCountry = phoneData.de_country;
        }

        if ( (phoneData.de_country != "none" && phoneData.auto_flag === false) || (phoneData.de_country != "none" && phoneData.auto_flag === "") ) {
            options.initialCountry = phoneData.de_country;
        }

        if (phoneData.flag == "" || phoneData.flag == "flagonly") {
            options.nationalMode = true;
        } else if (phoneData.flag == "flagcode") {
            options.nationalMode = false;
            options.autoHideDialCode = false;
        } else {
            options.nationalMode = false;
            options.showSelectedDialCode = true;
        }

        if (phoneData.auto_flag && gfipMainData.ipinfoToken !== null) {
            options.initialCountry = "auto";
            options.geoIpLookup = function (success, failure) {
                $j.get(
                    `https://ipinfo.io?token=${gfipMainData.ipinfoToken}`,
                    function () {},
                    "jsonp"
                ).always(function (resp) {
                    var countryCode =
                        resp && resp.country ? resp.country : "";
                    success(countryCode);
                });
            };
        }

        if (phoneData.auto_flag && gfipMainData.ipinfoToken === null) {
            options.initialCountry = "auto";
            options.geoIpLookup = function (success, failure) {
                $j.get("https://ipinfo.io", function () {}, "jsonp").always(
                    function (resp) {
                        var countryCode =
                            resp && resp.country ? resp.country : "";
                        success(countryCode);
                    }
                );
            };
        }

        options = gform.applyFilters( 'gform_spf_options_pre_init', options, form_id, field_id);

        $j(input_id).intlTelInput(options);

    });

    /*
     **   Live Phone number validation
     */

    jQuery('.smart_phone_field').each( function(i, e) {
        var _this       = jQuery(this).find('.ginput_container_phone'),
            phoneData   = _this.data(),
            field_index = phoneData.formid + '_' + phoneData.fieldid,
            inputId     = '#input_' + phoneData.formid + '_' + phoneData.fieldid,
            teleInput   = jQuery(inputId);

        teleInput.keypress(function (e) {   
            var charCode = (e.which) ? e.which : event.keyCode;
            if (!(charCode >= 48 && charCode <= 57) && charCode !== 43 && charCode !== 8) {
                e.preventDefault();
                return false;
            }                      
        }); 
        
        teleInput.blur(function () {
            GC_SPF.isInputValid($j(this), teleInput, field_index);
        });

        teleInput.keyup(function () {
            if (typeof intlTelInputUtils !== "undefined") {
                var currentText = teleInput.intlTelInput( "getNumber", intlTelInputUtils.numberFormat.E164 );
                if (typeof currentText === "string") {
                    teleInput.intlTelInput("setNumber", currentText);
                }
                GC_SPF.formatValidation($j(this));
            }
        });

        var cookeNumber = GC_SPF.getCookie("gf_spf_" + field_index);

        var nps = jQuery(teleInput).val().trim();


        if (nps) {
            $j(teleInput).closest("div").find("input:hidden").val('+' + cookeNumber);
        }
    });

    /*
     **   Text field phone meta select
     */

    jQuery('.phone_meta_field').each( function(i, e) {
        var _this       = jQuery(this).find('.ginput_container_text'),
            phoneData   = _this.data(),
            phoneID     = jQuery('#input_' + phoneData.form_id + '_' + phoneData.parent_id),
            insertID    = '#input_' + phoneData.form_id + '_' + phoneData.field_id;

        setTimeout(() => {
            var data = phoneID.intlTelInput("getSelectedCountryData");
            GC_SPF.populatePhoneMeta(insertID, phoneData.meta_id, data);
        }, 500);

        $j(phoneID).on("countrychange", function (event) {
            var data2 = phoneID.intlTelInput("getSelectedCountryData");
            GC_SPF.populatePhoneMeta(insertID, phoneData.meta_id, data2);
        });
    });

    jQuery('.auto_country_select').each( function(i, e) {
        var _this       = jQuery(this).find('.ginput_container_address'),
            phoneData   = _this.data();


        var country = GC_SPF.getCookie('gcspf_ip_data') ? JSON.parse(GC_SPF.getCookie('gcspf_ip_data')) : '',
            addressId   = '#input_' + phoneData.form_id + '_' + phoneData.field_id + '_6',
            active      = phoneData.auto_country;

        const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
            type: "region",
        });

        if( country.country != undefined && active) {
            let cn = regionNamesInEnglish.of(country.country);
            $j(addressId).val(cn).trigger('change');       
        } else {
            $j.get(`https://ipinfo.io${gfipMainData.ipinfoToken ? "?token=" + gfipMainData.ipinfoToken : "" }`,
                function () {}, "jsonp"
            ).always(function (resp) {
                var countryCode = resp && resp.country ? resp.country : "";
                let cn = regionNamesInEnglish.of(countryCode);

                $j(addressId).val(cn).trigger('change');
            });
        }
    });

});

} )( jQuery );