package com.tensquare.sms.listener;

import com.aliyuncs.exceptions.ClientException;
import com.tensquare.sms.utils.SmsUtil;
import com.tensquare.utils.MapUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author xxm
 * @create 2019-02-24 19:06
 */
@Component
@RabbitListener(queues = "sms")
@Slf4j
public class SmsListener {

    @Autowired
    private SmsUtil smsUtil;

    @Value("${aliyun.sms.verrifyTemplateCode}")
    private String templateCode;

    @Value("${aliyun.sms.signName}")
    private String signName;
    @RabbitHandler
    public void executeSms(Map map) throws ClientException {
        String mobile = MapUtil.getStrValue(map, "mobile");
        String checkCode = MapUtil.getStrValue(map, "checkCode");
        log.info("手机号【{}】",mobile);
        log.info("验证码【{}】", checkCode);
        smsUtil.sendSms(mobile,templateCode,signName,"{\"code\":\""+checkCode+"\"}");
        //smsUtil.sendSms(mobile,templateCode,signName,"{\"name\":\"喻洪波\"}");
    }
}
