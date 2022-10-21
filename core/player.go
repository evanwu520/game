package core

import (
	"sync"

	"github.com/shopspring/decimal"
)

type UserInfo struct {
	Name    string
	Balance decimal.Decimal
	Lock    sync.RWMutex
}
