package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.model.Payment;

@Repository
@Transactional
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	Payment findByPaymentid(int paymentid);

	void deleteByPaymentid(int paymentid);

	List<Payment> findAll();
}
