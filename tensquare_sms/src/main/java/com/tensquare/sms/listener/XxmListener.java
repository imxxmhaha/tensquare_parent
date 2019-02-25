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
@RabbitListener(queues = "xxm")
@Slf4j
public class XxmListener {

    @Autowired
    private SmsUtil smsUtil;

    @Value("${aliyun.sms.successTemplateCode}")
    private String templateCode;

    @Value("${aliyun.sms.signName}")
    private String signName;
    @RabbitHandler
    public void executeSms(Map map) throws ClientException {
        String mobile = MapUtil.getStrValue(map, "mobile");
        String nickname = MapUtil.getStrValue(map, "nickname");
        log.info("手机号【{}】",mobile);
        log.info("nickname【{}】",nickname);
        smsUtil.sendSms(mobile,templateCode,signName,"{\"name\":\""+nickname+"\"}");
    }
}
