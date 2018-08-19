from django.shortcuts import render, redirect, get_object_or_404, render_to_response
from .forms import LoginForm, RegisterForm
from django.http import HttpResponse
from .forms import EditProfileForm
from .models import Student, Question, Exams
from django.contrib import messages


def base(request):
    user1 = request.session['z']
    return render_to_response(request, 'base.html', {'user1': user1})


def categories_processor(request):
    user1 = request.session['z']
    return {'user1': user1}


def profile(request):
    if request.session.has_key('z'):
        us = request.session['z']
        name = request.session['name']
        user = Student.objects.filter(user=us)
        instance = get_object_or_404(Student, user=us)
        context = {
            'user': user,
            'ur': us,
            'instance': instance,
            'exam_name': name,
        }
        return render(request, 'profile.html', context)


def profile_form(request):
    form = EditProfileForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        instance = form.save(commit=False)
        instance.save()
    context = {"form": form}
    return render(request, 'profile_edit.html', context)


def profile_details(request, user=None):
    instance = get_object_or_404(Student, user=user)
    context = {
        'user': instance.user,
        'instance': instance,
    }
    return render(request, 'profile_details.html', context)


def profile_update(request, user=None):
    if request.session.has_key('z'):
        instance = get_object_or_404(Student, user=user)
        form = EditProfileForm(request.POST or None, request.FILES or None, instance=instance)
        exam_name = request.session['name']
        if form.is_valid():
            instance = form.save(commit=False)
            instance.save()
            messages.success(request, "Successfully Saved")
            return redirect("profile")
        context = {
            "ur": instance.user,
            "instance": instance,
            "form": form,
            'exam_name':exam_name,
        }
        return render(request, 'profile_edit.html', context)


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.save()
            messages.success(request, "Successfully saved")
            return  redirect('/login')
    else:
        form = RegisterForm()

    return render(request, 'reg_form.html', {'form': form})


def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            exam = Exams.objects.all()
            ur = form.cleaned_data['username']
            pd = form.cleaned_data['password']
            dbuser = Student.objects.filter(user=ur, password=pd)
            if not dbuser:
                return HttpResponse('Login failed')
            else:
                request.session['z'] = ur
                request.session.get_expiry_age()
                instance = get_object_or_404(Student, user=ur)
                return render(request, 'examopt.html', {'exam': exam, 'ur': ur, 'instance': instance})
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})


def exams(request):
    if request.session.has_key('z'):
        name = request.GET.get('name')
        request.session['name'] = name
        a = request.session['z']
        exam = Exams.objects.filter(exam_name=name)
        instance = get_object_or_404(Student, user=a)
        context = {
            'exam': exam,
            'ur': a,
            'instance': instance,
            'exam_name': name,
        }
        return render(request, 'exams1.html', context)


def home(request):
    return render(request, 'index.html')


def contact(request):
    return render(request, 'contact.html')


def start_exam(request):
    if request.session.has_key('z'):
        name = request.session['name']
        exam = Exams.objects.filter(exam_name=name)
        ques = Question.objects.all().filter(exam_name__in=exam)
        return render(request, '1.html', {'ques': ques})


def report(request):
    ur = request.session['z']
    exam_name = request.session['name']
    instance = get_object_or_404(Student, user=ur)
    context = {
        'ur': ur,
        'instance': instance,
        'exam_name': exam_name,
    }
    return render(request, 'REPORT.html', context)


def analysis(request):
    if request.session.has_key('z'):
        us = request.session['z']
        exam_name = request.session['name']
        instance = get_object_or_404(Student, user=us)
        context = {
            'ur': us,
            'instance': instance,
            'exam_name': exam_name,
        }
        return render(request, 'result_analysis.html', context)


def add_variable_to_context(request):
    user1 = request.session['z']
    return {
        'user1': user1,

    }


def logout(request):
    if request.session.has_key('z'):
        request.session.flush()
    return redirect('/home')
