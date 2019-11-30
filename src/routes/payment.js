import { Router } from 'express';
import {
  GetQrData,
  CompletePayment,
} from '../services/paymentService';

const router = Router();

router.post('/', (req, res) => {
  let data = req.body.data;
  const amount = data.paymentInfoList[0].paymentActionList.reduce(
    (acc, obj) => acc + obj.amount,
    0,
  );

  GetQrData(amount, function(qrData) {
    data.QRdata = qrData;

    CompletePayment(data, function(paymentResult) {
      if (paymentResult) {
        res.status(200);
        return res.send(paymentResult);
      } else {
        res.status(400);
        return res.send();
      }
    });
  });
});

export default router;
