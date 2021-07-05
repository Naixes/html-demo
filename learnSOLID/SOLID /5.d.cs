    interface IBankAccount
    {
        long BankNumber { get; set; } // 卡号
        decimal Balance { get; set; } // 余额
    }

    // 转账人
    interface ITransferSource : IBankAccount
    {
        void CutPayment(decimal value);
    }

    // 收款人
    interface ITransferDestination : IBankAccount
    {
        void AddMoney(decimal value);
    }

    class BankAccout : IBankAccount, ITransferSource, ITransferDestination
    {
        public long BankNumber { get; set; }
        public decimal Balance { get; set; }
        public void CutPayment(decimal value)
        {
            Balance -= value;
        }
        public void AddMoney(decimal value)
        {
            Balance += value;
        }
    }
   
    class TransferAmount
    {
        public decimal Amount { get; set; }
        public void Transfer(ITransferSource source, ITransferDestination dest)
        {
            source.CutPayment(Amount);
            dest.AddMoney(Amount);
        }
    }

   